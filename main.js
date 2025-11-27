console.log("main.js loaded ✔");

// =========================================================
// GLOBAL STATE
// =========================================================
let accuracyChartInstance = null;
let responseTimeChartInstance = null;

let socket = null;
let wsInitialized = false;

let evaluationDone = false;


// =========================================================
// ROUTING
// =========================================================
function showPage() {
  const hash = window.location.hash || "#home";
  const pages = document.querySelectorAll(".page");

  pages.forEach(p => {
    p.style.display = ("#" + p.id === hash) ? "block" : "none";
  });

  // Load charts only AFTER evaluation was completed
  if (hash === "#results" && evaluationDone) {
    loadCharts();
  }
}


// =========================================================
// ASSISTANT BUBBLE
// =========================================================
const assistantMessages = [
  "Hi, I’m your project assistant. Use the menu to switch pages.",
  "The Evaluation Setup page explains MongoDB and Node.js.",
  "Check the Results page for accuracy and response time charts.",
  "The Server & Live Features page shows live WebSocket logs.",
  "The backend runs locally on http://localhost:3000.",
];

let assistantIndex = 0;

function rotateAssistantMessage() {
  if (window.location.hash === "#results") return;

  const el = document.getElementById("assistant-text");
  if (!el) return;

  el.textContent = assistantMessages[assistantIndex];
  assistantIndex = (assistantIndex + 1) % assistantMessages.length;
}


// =========================================================
// STATUS BADGE
// =========================================================
function setStatus(msg, type = "") {
  const badge =
    document.getElementById("resultsStatus") ||
    document.getElementById("resultsStatusResults");

  if (!badge) return;

  badge.className = "badge";

  if (type === "running") {
    badge.innerHTML = `<span class="spinner"></span> ${msg}`;
  } else {
    badge.textContent = msg;
  }

  if (type === "ok") badge.style.background = "#065f46";
  if (type === "error") badge.style.background = "#7f1d1d";
}


// =========================================================
// API DEMO
// =========================================================
async function loadApiDemo() {
  const el = document.getElementById("api-demo");
  if (!el) return;

  try {
    const res = await fetch("http://localhost:3000/api/add?a=2&b=3");

    if (!res.ok) {
      el.textContent = `GET /api/add?a=2&b=3\n→ Error ${res.status}`;
      return;
    }

    const data = await res.json();
    el.textContent = `GET /api/add?a=2&b=3\n→ ${JSON.stringify(data)}`;
  } catch {
    el.textContent = "Backend not running. Start Node.js.";
  }
}


// =========================================================
// WEBSOCKET
// =========================================================
function setupWebSocket() {
  if (wsInitialized) return;
  wsInitialized = true;

  const wsBox = document.getElementById("ws-status");
  const logBox = document.getElementById("eval-log");

  socket = new WebSocket("ws://localhost:3000");
  wsBox.textContent = "Connecting…";

  socket.addEventListener("open", () => {
    wsBox.textContent = "WebSocket connected ✔";
    socket.send("Frontend connected");
  });

  socket.addEventListener("message", event => {
    const msg = event.data;
    wsBox.textContent = msg;
    logBox.innerHTML += msg + "<br>";
    logBox.scrollTop = logBox.scrollHeight;
  });

  socket.addEventListener("close", () => {
    wsBox.textContent = "WebSocket closed.";
  });

  socket.addEventListener("error", () => {
    wsBox.textContent = "WebSocket error.";
  });
}


// =========================================================
// FETCH RESULTS
// =========================================================
async function fetchResults() {
  const el = document.getElementById("summaryDashboard");

  try {
    const res = await fetch("http://localhost:3000/api/results?ts=" + Date.now());

    if (!res.ok) {
      el.textContent = `Error fetching results (${res.status})`;
      setStatus("Results error", "error");
      return null;
    }

    return await res.json();

  } catch {
    el.textContent = "Backend unreachable";
    setStatus("Backend unreachable", "error");
    return null;
  }
}


// =========================================================
// BUILD CHARTS
// =========================================================
async function loadCharts() {
  const accuracyCanvas = document.getElementById("accuracyChart");
  const timeCanvas = document.getElementById("responseTimeChart");

  if (!accuracyCanvas || !timeCanvas) return;

  setStatus("Loading results…", "running");

  const data = await fetchResults();
  if (!data) return;

  const labels = Object.keys(data);
  const accuracyValues = labels.map(key => data[key].accuracy * 100);
  const timeValues = labels.map(key => data[key].avgResponseTimeMs);

  // Destroy existing charts for clean refresh
  if (accuracyChartInstance) accuracyChartInstance.destroy();
  if (responseTimeChartInstance) responseTimeChartInstance.destroy();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600 },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(255,255,255,0.08)" }
      },
      x: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(255,255,255,0.05)" }
      }
    },
    plugins: {
      legend: { labels: { color: "#e2e8f0" } }
    }
  };

  // Accuracy Chart
  accuracyChartInstance = new Chart(accuracyCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Accuracy (%)",
          data: accuracyValues,
          backgroundColor: "#3b82f6",
          borderRadius: 10
        }
      ]
    },
    options: chartOptions
  });

  // Response Time Chart
  responseTimeChartInstance = new Chart(timeCanvas, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Response Time (ms)",
          data: timeValues,
          backgroundColor: "#60a5fa",
          borderRadius: 10
        }
      ]
    },
    options: chartOptions
  });

  // -------- Summary block --------
  const bestAccIndex = accuracyValues.indexOf(Math.max(...accuracyValues));
  const bestTimeIndex = timeValues.indexOf(Math.min(...timeValues));

  document.getElementById("summaryDashboard").innerHTML = `
    <p><strong>Best Accuracy:</strong> ${labels[bestAccIndex]} 
       — ${accuracyValues[bestAccIndex].toFixed(1)}%</p>

    <p><strong>Fastest Domain:</strong> ${labels[bestTimeIndex]} 
       — ${timeValues[bestTimeIndex]} ms</p>
  `;

  setStatus("Results loaded! ", "ok");
}


// =========================================================
// RUN EVALUATION
// =========================================================
async function runEvaluation() {
  setStatus("Running evaluation…", "running");

  const logBox = document.getElementById("eval-log");
  logBox.innerHTML = "<span style='color:#0f0;'>Starting evaluation...</span><br>";

  try {
    const res = await fetch("http://localhost:3000/api/run-evaluation", {
      method: "POST"
    });

    if (!res.ok) {
      setStatus("Evaluation failed", "error");
      return;
    }

    // IMPORTANT!
    evaluationDone = true;

    // slight delay while MongoDB saves
    await new Promise(r => setTimeout(r, 500));

    await loadCharts();
    setStatus("Evaluation complete!", "ok");

  } catch (err) {
    setStatus("Backend unreachable", "error");
  }
}


// =========================================================
// INIT
// =========================================================
function init() {
  showPage();
  window.addEventListener("hashchange", showPage);

  rotateAssistantMessage();
  setInterval(rotateAssistantMessage, 5000);

  loadApiDemo();
  setupWebSocket();

  const btn = document.getElementById("runEvalBtn");
  if (btn) {
    btn.addEventListener("click", e => {
      e.preventDefault();
      runEvaluation();
    });
  }
}

window.addEventListener("load", init);
