// seed.js — inserts 150 real questions into MongoDB
require("dotenv").config();
const { MongoClient } = require("mongodb");

// --------------------------
// MongoDB Connection String
// --------------------------
const MONGODB_URI =
  "mongodb+srv://taha4:ichigo2004@cluster0.4go0kno.mongodb.net/ChatGPT_Evaluation?retryWrites=true&w=majority";

const DB_NAME = "ChatGPT_Evaluation";

const client = new MongoClient(MONGODB_URI);

// --------------------------
// 50 HISTORY QUESTIONS
// --------------------------
const historyQuestions = [
  {
    question: "HISTORY: Who was the first emperor of Rome?",
    expected_answer: "Augustus (Octavian).",
  },
  {
    question: "HISTORY: What year did World War II begin?",
    expected_answer: "1939.",
  },
  {
    question: "HISTORY: Which ancient civilization built Machu Picchu?",
    expected_answer: "The Inca Empire.",
  },
  {
    question: "HISTORY: Who wrote the Declaration of Independence?",
    expected_answer: "Thomas Jefferson.",
  },
  {
    question: "HISTORY: What was the capital of the Byzantine Empire?",
    expected_answer: "Constantinople.",
  },
  {
    question: "HISTORY: Which empire was ruled by Genghis Khan?",
    expected_answer: "The Mongol Empire.",
  },
  {
    question: "HISTORY: What event started the French Revolution?",
    expected_answer: "The storming of the Bastille.",
  },
  {
    question: "HISTORY: Who was the British Prime Minister during most of WWII?",
    expected_answer: "Winston Churchill.",
  },
  {
    question: "HISTORY: The Cold War was primarily between which two countries?",
    expected_answer: "The United States and the Soviet Union.",
  },
  {
    question: "HISTORY: What ship famously sank in 1912?",
    expected_answer: "The Titanic.",
  },
  {
    question: "HISTORY: Who led India’s independence movement?",
    expected_answer: "Mahatma Gandhi.",
  },
  {
    question: "HISTORY: What wall fell in 1989, symbolizing the end of the Cold War?",
    expected_answer: "The Berlin Wall.",
  },
  {
    question: "HISTORY: Who discovered penicillin?",
    expected_answer: "Alexander Fleming.",
  },
  {
    question: "HISTORY: Which civilization developed the first known writing system?",
    expected_answer: "The Sumerians.",
  },
  {
    question: "HISTORY: Who was Pharaoh during the building of the Great Pyramid?",
    expected_answer: "Khufu (Cheops).",
  },
  {
    question: "HISTORY: What was the name of the trade route linking China and Europe?",
    expected_answer: "The Silk Road.",
  },
  {
    question: "HISTORY: Who was assassinated on June 28, 1914, triggering WWI?",
    expected_answer: "Archduke Franz Ferdinand.",
  },
  {
    question: "HISTORY: Which empire built the Colosseum?",
    expected_answer: "The Roman Empire.",
  },
  {
    question: "HISTORY: The Renaissance began in which country?",
    expected_answer: "Italy.",
  },
  {
    question: "HISTORY: Who was the last Tsar of Russia?",
    expected_answer: "Nicholas II.",
  },
  {
    question: "HISTORY: Which war was fought between the North and South in the US?",
    expected_answer: "The American Civil War.",
  },
  {
    question: "HISTORY: What ancient people built Stonehenge?",
    expected_answer: "Neolithic Britons.",
  },
  {
    question: "HISTORY: Who was the first President of the United States?",
    expected_answer: "George Washington.",
  },
  {
    question: "HISTORY: Which ancient civilization invented democracy?",
    expected_answer: "Ancient Athens (Greeks).",
  },
  {
    question: "HISTORY: What was the 14th-century pandemic that killed millions in Europe?",
    expected_answer: "The Black Death.",
  },
  {
    question: "HISTORY: Which empire ruled over modern-day Mexico before Spain?",
    expected_answer: "The Aztec Empire.",
  },
  {
    question: "HISTORY: Who painted the Mona Lisa?",
    expected_answer: "Leonardo da Vinci.",
  },
  {
    question: "HISTORY: What country was divided into North and South after WWII?",
    expected_answer: "Korea.",
  },
  {
    question: "HISTORY: Who was the leader of Nazi Germany?",
    expected_answer: "Adolf Hitler.",
  },
  {
    question: "HISTORY: Which battle marked Napoleon’s final defeat?",
    expected_answer: "The Battle of Waterloo.",
  },
  {
    question: "HISTORY: What civilization built the ziggurats of Mesopotamia?",
    expected_answer: "The Sumerians.",
  },
  {
    question: "HISTORY: Who was known as the 'Sun King' of France?",
    expected_answer: "Louis XIV.",
  },
  {
    question: "HISTORY: What was the name of the first successful English colony in America?",
    expected_answer: "Jamestown.",
  },
  {
    question: "HISTORY: Who invented the telephone?",
    expected_answer: "Alexander Graham Bell.",
  },
  {
    question: "HISTORY: What country colonized Vietnam before the Vietnam War?",
    expected_answer: "France.",
  },
  {
    question: "HISTORY: Who was the first man to walk on the moon?",
    expected_answer: "Neil Armstrong.",
  },
  {
    question: "HISTORY: What document limited the power of the English monarchy in 1215?",
    expected_answer: "The Magna Carta.",
  },
  {
    question: "HISTORY: The Iron Curtain metaphor described divisions in what region?",
    expected_answer: "Europe during the Cold War.",
  },
  {
    question: "HISTORY: Who conquered the Persian Empire?",
    expected_answer: "Alexander the Great.",
  },
  {
    question: "HISTORY: What dynasty built most of the Great Wall of China?",
    expected_answer: "The Ming Dynasty.",
  },
  {
    question: "HISTORY: Who was Cleopatra?",
    expected_answer: "The last ruler of the Ptolemaic Kingdom of Egypt.",
  },
  {
    question: "HISTORY: Which war ended with the Treaty of Versailles?",
    expected_answer: "World War I.",
  },
  {
    question: "HISTORY: Who was the founder of Islam?",
    expected_answer: "The Prophet Muhammad.",
  },
  {
    question: "HISTORY: What major American event occurred on July 4, 1776?",
    expected_answer: "Declaration of Independence.",
  },
  {
    question: "HISTORY: What oceanic disaster killed 4,000 sailors in 1941?",
    expected_answer: "The attack on Pearl Harbor.",
  },
  {
    question: "HISTORY: Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
    expected_answer: "Nikita Khrushchev.",
  },
  {
    question: "HISTORY: What structure did Emperor Hadrian order built in Britain?",
    expected_answer: "Hadrian's Wall.",
  },
  {
    question: "HISTORY: Which empire dominated Eastern Europe for 600 years until 1918?",
    expected_answer: "The Austro-Hungarian Empire.",
  },
  {
    question: "HISTORY: Who was known as the ‘Father of Modern Physics’?",
    expected_answer: "Albert Einstein.",
  },
  {
    question: "HISTORY Q51: What role did the Silk Road play in the exchange of goods, culture, and technology between civilizations?",
    expected_answer: "The Silk Road enabled trade and cultural exchange."
  },
];

// --------------------------
// 50 SOCIAL SCIENCE QUESTIONS
// --------------------------
const socialQuestions = [
  {
    question: "SOCIAL SCIENCE: What is the definition of sociology?",
    expected_answer: "The study of society, social relationships, and institutions.",
  },
  {
    question: "SOCIAL SCIENCE: What is classical conditioning?",
    expected_answer: "Learning through association, discovered by Pavlov.",
  },
  {
    question: "SOCIAL SCIENCE: What does GDP measure?",
    expected_answer: "The total value of goods and services produced within a country.",
  },
  {
    question: "SOCIAL SCIENCE: Who is known as the father of psychoanalysis?",
    expected_answer: "Sigmund Freud.",
  },
  {
    question: "SOCIAL SCIENCE: What is cultural diffusion?",
    expected_answer: "The spread of cultural beliefs and practices between groups.",
  },
  {
    question: "SOCIAL SCIENCE: Define supply and demand.",
    expected_answer: "Supply is how much is available; demand is how much consumers want.",
  },
  {
    question: "SOCIAL SCIENCE: What is ethnography?",
    expected_answer: "A qualitative research method involving immersion in a culture.",
  },
  {
    question: "SOCIAL SCIENCE: What is cognitive dissonance?",
    expected_answer: "Psychological discomfort from holding conflicting beliefs.",
  },
  {
    question: "SOCIAL SCIENCE: What is social stratification?",
    expected_answer: "A system of ranking people in a hierarchy based on status or wealth.",
  },
  {
    question: "SOCIAL SCIENCE: Who proposed the hierarchy of needs?",
    expected_answer: "Abraham Maslow.",
  },
  {
    question: "SOCIAL SCIENCE: Define inflation.",
    expected_answer: "A general increase in prices over time.",
  },
  {
    question: "SOCIAL SCIENCE: What is nationalism?",
    expected_answer: "Pride and loyalty toward one's nation.",
  },
  {
    question: "SOCIAL SCIENCE: What is the bystander effect?",
    expected_answer: "People are less likely to help when others are present.",
  },
  {
    question: "SOCIAL SCIENCE: Describe how social stratification influences access to education in modern societies.",
    expected_answer: "Social stratification affects access to education."
  },
  {
    question: "SOCIAL SCIENCE: What is socialization?",
    expected_answer: "The lifelong process of learning culture and norms.",
  },
  {
    question: "SOCIAL SCIENCE: What does the term ‘anomie’ mean?",
    expected_answer: "A state of normlessness, introduced by Durkheim.",
  },
  {
    question: "SOCIAL SCIENCE: What is macroeconomics?",
    expected_answer: "The study of large-scale economic factors.",
  },
  {
    question: "SOCIAL SCIENCE: What is the placebo effect?",
    expected_answer: "Improvement caused by belief in a treatment rather than the treatment.",
  },
  {
    question: "SOCIAL SCIENCE: What is confirmation bias?",
    expected_answer: "Favoring information that confirms existing beliefs.",
  },
  {
    question: "SOCIAL SCIENCE: Define capitalism.",
    expected_answer: "An economic system based on private ownership and profit.",
  },
  {
    question: "SOCIAL SCIENCE: What is a stereotype?",
    expected_answer: "A generalized belief about a group of people.",
  },
  {
    question: "SOCIAL SCIENCE: Who wrote The Wealth of Nations?",
    expected_answer: "Adam Smith.",
  },
  {
    question: "SOCIAL SCIENCE: What is the Hawthorne effect?",
    expected_answer: "People change behavior because they know they're being observed.",
  },
  {
    question: "SOCIAL SCIENCE: What is the difference between sex and gender?",
    expected_answer: "Sex is biological; gender is socially constructed.",
  },
  {
    question: "SOCIAL SCIENCE: Define social mobility.",
    expected_answer: "Movement of individuals within a social hierarchy.",
  },
  {
    question: "SOCIAL SCIENCE: What is GDP per capita?",
    expected_answer: "GDP divided by population, measuring average economic output.",
  },
  {
    question: "SOCIAL SCIENCE: What is operant conditioning?",
    expected_answer: "Learning through rewards and punishments (Skinner).",
  },
  {
    question: "SOCIAL SCIENCE: What is ethnocentrism?",
    expected_answer: "Judging another culture by the standards of one's own.",
  },
  {
    question: "SOCIAL SCIENCE: Who is Karl Marx?",
    expected_answer: "A philosopher known for communism and conflict theory.",
  },
  {
    question: "SOCIAL SCIENCE: Define bureaucracy.",
    expected_answer: "A formal organization with a hierarchy and clear rules.",
  },
  {
    question: "SOCIAL SCIENCE: What is the unemployment rate?",
    expected_answer: "The percentage of the labor force without a job.",
  },
  {
    question: "SOCIAL SCIENCE: Define social norm.",
    expected_answer: "Shared rules that guide behavior in groups.",
  },
  {
    question: "SOCIAL SCIENCE: What is the Stanford Prison Experiment?",
    expected_answer: "A study by Zimbardo showing how roles influence behavior.",
  },
  {
    question: "SOCIAL SCIENCE: Define globalization.",
    expected_answer: "Integration of economies, cultures, and populations worldwide.",
  },
  {
    question: "SOCIAL SCIENCE: What is the greenhouse effect?",
    expected_answer: "Warming caused by trapping of heat in Earth's atmosphere.",
  },
  {
    question: "SOCIAL SCIENCE: What is the social contract?",
    expected_answer: "A theory that people give power to government in exchange for protection.",
  },
  {
    question: "SOCIAL SCIENCE: Who developed behaviorism?",
    expected_answer: "John B. Watson.",
  },
  {
    question: "SOCIAL SCIENCE: What is social capital?",
    expected_answer: "Resources gained from social networks.",
  },
  {
    question: "SOCIAL SCIENCE: Define ideology.",
    expected_answer: "A system of ideas that guides political or social policy.",
  },
  {
    question: "SOCIAL SCIENCE: What is intersectionality?",
    expected_answer: "Framework examining overlapping identities and oppression.",
  },
  {
    question: "SOCIAL SCIENCE: What is a meritocracy?",
    expected_answer: "A system where advancement is based on ability or achievement.",
  },
  {
    question: "SOCIAL SCIENCE: What is scarcity?",
    expected_answer: "Limited resources versus unlimited wants.",
  },
  {
    question: "SOCIAL SCIENCE: What is classical liberalism?",
    expected_answer: "A philosophy advocating individual rights and limited government.",
  },
  {
    question: "SOCIAL SCIENCE: Define social stigma.",
    expected_answer: "Negative attitudes toward a person based on a characteristic.",
  },
  {
    question: "SOCIAL SCIENCE: What is the tragedy of the commons?",
    expected_answer: "Shared resources get depleted when individuals act in self-interest.",
  },
  {
    question: "SOCIAL SCIENCE: What does IQ measure?",
    expected_answer: "Cognitive ability relative to population norms.",
  },
  {
    question: "SOCIAL SCIENCE: What is social constructivism?",
    expected_answer: "Theory that knowledge is created through social interaction.",
  },
  {
    question: "SOCIAL SCIENCE: What is a longitudinal study?",
    expected_answer: "Research conducted over a long period of time.",
  },
  {
    question: "SOCIAL SCIENCE: What is a recession?",
    expected_answer: "Two consecutive quarters of economic decline.",
  },
  {
    question: "SOCIAL SCIENCE: What does anthropology study?",
    expected_answer: "Human cultures, evolution, and societies.",
  },
];

// --------------------------
// 50 COMPUTER SECURITY QUESTIONS
// --------------------------
const securityQuestions = [
  {
    question: "SECURITY: What does CIA stand for in cybersecurity?",
    expected_answer: "Confidentiality, Integrity, Availability.",
  },
  {
    question: "SECURITY: What is phishing?",
    expected_answer: "A social engineering attack using fraudulent messages.",
  },
  {
    question: "SECURITY: What is encryption?",
    expected_answer: "Transforming data so only authorized parties can read it.",
  },
  {
    question: "SECURITY: What is a firewall?",
    expected_answer: "A network security system that filters traffic.",
  },
  {
    question: "SECURITY: What is malware?",
    expected_answer: "Malicious software designed to harm a system.",
  },
  {
    question: "SECURITY: What is multi-factor authentication?",
    expected_answer: "Using more than one verification factor for login.",
  },
  {
    question: "SECURITY: What is a DDoS attack?",
    expected_answer: "Overloading a server with traffic to disrupt service.",
  },
  {
    question: "SECURITY: What is ransomware?",
    expected_answer: "Malware that encrypts data and demands payment.",
  },
  {
    question: "SECURITY: What does VPN stand for?",
    expected_answer: "Virtual Private Network.",
  },
  {
    question: "SECURITY: What is hashing?",
    expected_answer: "Converting data into a fixed-length digest.",
  },
  {
    question: "SECURITY: What is SQL injection?",
    expected_answer: "An attack that inserts malicious SQL into queries.",
  },
  {
    question: "SECURITY: What is social engineering?",
    expected_answer: "Manipulating people to gain access to systems.",
  },
  {
    question: "SECURITY: Define brute force attack.",
    expected_answer: "Trying all possible passwords until one works.",
  },
  {
    question: "SECURITY: What is a zero-day vulnerability?",
    expected_answer: "A flaw unknown to the vendor with no patch.",
  },
  {
    question: "SECURITY: What is penetration testing?",
    expected_answer: "Simulated attacks used to test security defenses.",
  },
  {
    question: "SECURITY: What is a botnet?",
    expected_answer: "A network of compromised computers controlled remotely.",
  },
  {
    question: "SECURITY: What is two-way SSL?",
    expected_answer: "A protocol where both server and client authenticate.",
  },
  {
    question: "SECURITY: What is a digital certificate?",
    expected_answer: "Electronic document verifying identity for encryption.",
  },
  {
    question: "SECURITY: What is access control?",
    expected_answer: "Restricting access based on permissions.",
  },
  {
    question: "SECURITY: What is AES?",
    expected_answer: "Advanced Encryption Standard.",
  },
  {
    question: "SECURITY: What is a vulnerability?",
    expected_answer: "A weakness that can be exploited.",
  },
  {
    question: "SECURITY: What is an IDS?",
    expected_answer: "Intrusion Detection System.",
  },
  {
    question: "SECURITY: What is an IPS?",
    expected_answer: "Intrusion Prevention System.",
  },
  {
    question: "SECURITY: What is a man-in-the-middle attack?",
    expected_answer: "Intercepting communication between two parties.",
  },
  {
    question: "SECURITY: What is a security patch?",
    expected_answer: "Software update that fixes vulnerabilities.",
  },
  {
    question: "SECURITY: What is biometrics?",
    expected_answer: "Authentication using physical traits like fingerprints.",
  },
  {
    question: "SECURITY: What is a honeypot?",
    expected_answer: "A decoy system used to lure attackers.",
  },
  {
    question: "SECURITY: What is a backdoor?",
    expected_answer: "Hidden method for bypassing security controls.",
  },
  {
    question: "SECURITY: What does SSL stand for?",
    expected_answer: "Secure Sockets Layer.",
  },
  {
    question: "SECURITY: What is TLS?",
    expected_answer: "Transport Layer Security.",
  },
  {
    question: "SECURITY: What is an API key?",
    expected_answer: "A token used to authenticate API access.",
  },
  {
    question: "SECURITY: Define keylogger.",
    expected_answer: "Software that records keystrokes.",
  },
  {
    question: "SECURITY: What is spoofing?",
    expected_answer: "Impersonating another device or user.",
  },
  {
    question: "SECURITY: What is a worm?",
    expected_answer: "A self-replicating program that spreads automatically.",
  },
  {
    question: "SECURITY: What is a Trojan horse?",
    expected_answer: "Malware disguised as legitimate software.",
  },
  {
    question: "SECURITY: What is data exfiltration?",
    expected_answer: "Unauthorized transfer of data out of a system.",
  },
  {
    question: "SECURITY: What is least privilege?",
    expected_answer: "Users receive only the minimum access required.",
  },
  {
    question: "SECURITY: What are cookies in cybersecurity?",
    expected_answer: "Small files storing session and tracking data.",
  },
  {
    question: "SECURITY: What is sandboxing?",
    expected_answer: "Running programs in isolation to prevent harm.",
  },
  {
    question: "SECURITY: What is the OSI model?",
    expected_answer: "A 7-layer framework for network communication.",
  },
  {
    question: "SECURITY: What is MFA fatigue attack?",
    expected_answer: "Spamming login prompts until a user approves by mistake.",
  },
  {
    question: "SECURITY: What is an exploit?",
    expected_answer: "Code used to take advantage of a vulnerability.",
  },
  {
    question: "SECURITY: What is a session token?",
    expected_answer: "Identifier used to maintain authenticated sessions.",
  },
  {
    question: "SECURITY: What is cryptographic salt?",
    expected_answer: "Random data added before hashing to protect passwords.",
  },
  {
    question: "SECURITY: What is port scanning?",
    expected_answer: "Checking open ports on a system to find vulnerabilities.",
  },
  {
    question: "SECURITY: What is risk assessment?",
    expected_answer: "Identifying and evaluating potential security threats.",
  },
  {
    question: "SECURITY: What is a WAF?",
    expected_answer: "Web Application Firewall.",
  },
  {
    question: "SECURITY: What is public key cryptography?",
    expected_answer: "Encryption using a public-private key pair.",
  },
  {
    question: "SECURITY: What is a security audit?",
    expected_answer: "Evaluation of systems for compliance and vulnerabilities.",
  },
];

// ---------------------------------------------------------------
// MAIN SEED FUNCTION
// ---------------------------------------------------------------
async function seedDB() {
  try {
    await client.connect();
    const db = client.db(DB_NAME);

    console.log("Connected to DB — inserting documents...");

    // Clear old data
    await db.collection("History").deleteMany({});
    await db.collection("Social_Science").deleteMany({});
    await db.collection("Computer_Security").deleteMany({});

    // Insert new data
    await db.collection("History").insertMany(historyQuestions);
    await db.collection("Social_Science").insertMany(socialQuestions);
    await db.collection("Computer_Security").insertMany(securityQuestions);

    console.log("Inserted:");
    console.log("→ 50 History questions");
    console.log("→ 50 Social Science questions");
    console.log("→ 50 Computer Security questions");
    console.log("✔ DONE — Database successfully seeded!");
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await client.close();
  }
}

seedDB();
