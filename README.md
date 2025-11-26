# ChatGPT Efficiency Evaluation

This project evaluates ChatGPT’s performance across multiple academic domains by 
measuring **accuracy**, **response time**, and **reasoning consistency**. The system
combines a Node.js backend, MongoDB database, WebSocket communication, and a modern
front-end dashboard with Chart.js visualizations.

##  Project Overview

The application sends questions from three academic domains to ChatGPT:

- **History**
- **Social Science**
- **Computer Security**

For each question, the system:

1. Fetches the question from **MongoDB**
2. Sends it to the **ChatGPT API**
3. Records the **response time (latency)**
4. Checks **correctness** using keyword-based validation
5. Stores the evaluation results for visualization

The front-end then displays aggregated metrics, such as:

- Accuracy by domain  
- Average response time  
- Text summary of performance differences  

## Tech Stack

**Frontend**
- HTML, CSS, JavaScript
- Chart.js for charts and visualizations

**Backend**
- Node.js
- Express (if used)
- WebSockets for live updates

**Database**
- MongoDB (cloud-hosted via MongoDB Atlas)

**AI**
- OpenAI / ChatGPT API


## Dataset Overview

The evaluation uses a structured dataset of **150 questions** split evenly across three domains:

- **History (50 questions)**  
  Focuses on major events, historical figures, cultural developments, and 
  cause-and-effect relationships. These questions test factual accuracy, 
  timeline understanding, and interpretation of historical significance.

- **Social Science (50 questions)**  
  Covers topics in sociology, psychology, economics, and human behaviour.
  These items evaluate ChatGPT’s ability to explain concepts, apply theories to 
  real-world scenarios, and provide coherent reasoning.

- **Computer Security (50 questions)**  
  Includes questions about cybersecurity threats, encryption, authentication, 
  access control, and network security. This domain tests ChatGPT’s precision 
  with technical terminology and core security principles.

Each question has:
- A **prompt**
- An **expected answer or keyword set**
- A **domain label**



##  How to Run the Project

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
cd YOUR-REPO-NAME
