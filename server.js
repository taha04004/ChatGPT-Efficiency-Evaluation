// =====================================================
// server.js
// =====================================================

// Load env safely
require("dotenv").config({ path: "./.env" });

console.log("▶ server.js starting…");

// =====================================================
// DEPENDENCIES
// =====================================================
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const http = require("http");
const WebSocket = require("ws");
const OpenAI = require("openai");

// =====================================================
// CONFIG
// =====================================================
const MONGODB_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://taha4:ichigo2004@cluster0.4go0kno.mongodb.net/ChatGPT_Evaluation?retryWrites=true&w=majority";

const DB_NAME = "ChatGPT_Evaluation";
const COLLECTIONS = ["History", "Social_Science", "Computer_Security"];

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// =====================================================
// EXPRESS
// =====================================================
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// =====================================================
// TEST ROUTE
// =====================================================
app.get("/api/add", (req, res) => {
  console.log("✔ /api/add hit");
  const a = Number(req.query.a || 0);
  const b = Number(req.query.b || 0);
  return res.json({ a, b, sum: a + b });
});

// =====================================================
// WEBSOCKET
// =====================================================
const wss = new WebSocket.Server({ server });

function broadcast(msg) {
  wss.clients.forEach((c) => {
    if (c.readyState === WebSocket.OPEN) {
      try {
        c.send(msg);
      } catch {}
    }
  });
}

wss.on("connection", (socket) => {
  console.log("🔌 WebSocket client connected");
  socket.send("Connected to backend WebSocket server.");
});

// =====================================================
// MONGODB
// =====================================================
let db = null;
const mongoClient = new MongoClient(MONGODB_URI);

async function getDB() {
  if (!db) {
    console.log("⏳ Connecting to MongoDB…");
    await mongoClient.connect();
    db = mongoClient.db(DB_NAME);
    console.log("📦 Connected to MongoDB:", DB_NAME);
  }
  return db;
}

// Small helper
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// =====================================================
// ASK OPENAI
// =====================================================
async function askOpenAI(question) {
  const start = Date.now();

  async function send() {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: question }],
      max_tokens: 200,
      temperature: 0.3,
    });

    const answer = completion.choices[0]?.message?.content || "No answer";
    return { answer, latency: Date.now() - start };
  }

  try {
    return await send();
  } catch (err) {
    if (err?.status === 429) {
      console.log("⚠️ 429 — retrying in 2s…");
      await sleep(2000);
      try {
        return await send();
      } catch (err2) {
        return {
          answer: "OpenAI Error (after retry): " + err2.message,
          latency: Date.now() - start,
        };
      }
    }

    return {
      answer: "OpenAI Error: " + err.message,
      latency: Date.now() - start,
    };
  }
}

// =====================================================
// SMART CORRECTNESS CHECK
// =====================================================
function evaluateCorrectness(gptAnswer, expected) {
  if (!gptAnswer || !expected) return false;

  const a = gptAnswer.toLowerCase();
  const b = expected.toLowerCase();

  if (a.includes(b)) return true;
  if (b.includes(a)) return true;

  const tokens = b.split(" ").filter((t) => t.length > 3);
  return tokens.some((t) => a.includes(t));
}

// =====================================================
// RUN FULL EVALUATION
// =====================================================
app.post("/api/run-evaluation", async (req, res) => {
  try {
    const db = await getDB();
    broadcast("🚀 Starting evaluation…");

    for (const domain of COLLECTIONS) {
      broadcast(`📁 Evaluating ${domain}…`);

      const collection = db.collection(domain);
      const docs = await collection.find().toArray();

      const CONCURRENCY = 5;
      let idx = 0;

      async function worker() {
        while (true) {
          const myIndex = idx++;
          if (myIndex >= docs.length) break;

          const doc = docs[myIndex];
          const qNum = myIndex + 1;

          broadcast(`${domain}: Q${qNum} — querying ChatGPT…`);

          const { answer, latency } = await askOpenAI(doc.question);
          const isCorrect = evaluateCorrectness(answer, doc.expected_answer);

          await collection.updateOne(
            { _id: doc._id },
            {
              $set: {
                chatgpt_response: answer,
                is_correct: isCorrect,
                response_time_ms: latency,
              },
            }
          );
        }
      }

      const workers = [];
      for (let i = 0; i < CONCURRENCY; i++) workers.push(worker());
      await Promise.all(workers);

      broadcast(`✅ Finished ${domain}`);
    }

    broadcast("🎉 Evaluation complete!");
    res.json({ ok: true });
  } catch (err) {
    broadcast("❌ Evaluation failed.");
    res.status(500).json({ error: "Evaluation failed" });
  }
});

// =====================================================
// RESULTS API
// =====================================================
app.get("/api/results", async (req, res) => {
  try {
    const db = await getDB();
    const results = {};

    for (const domain of COLLECTIONS) {
      const docs = await db
        .collection(domain)
        .find({ response_time_ms: { $exists: true } })
        .toArray();

      if (!docs.length) {
        results[domain] = { accuracy: 0, avgResponseTimeMs: 0 };
        continue;
      }

      const correct = docs.filter((d) => d.is_correct).length;
      const avg =
        docs.reduce((sum, d) => sum + d.response_time_ms, 0) /
        docs.length;

      results[domain] = {
        accuracy: correct / docs.length,
        avgResponseTimeMs: Math.round(avg),
      };
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

// =====================================================
// HEALTH CHECK
// =====================================================
app.get("/", (req, res) => {
  res.send("Backend running ✔ (Mode B: 5-way parallel per domain)");
});

// =====================================================
// START SERVER
// =====================================================
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server + WebSocket running at http://localhost:${PORT}`);
});
