# SevaSahayak: Multi-Agent Elderly Care System

## Overview
SevaSahayak is a next-generation elderly care platform designed to support aging individuals in maintaining a safe, healthy, and socially connected lifestyle. Built on a privacy-first philosophy, SevaSahayak employs a custom multi-agent framework driven by on-premise Ollama-based large language models (LLMs), enabling intelligent support without compromising personal data. The system integrates with wearable devices, provides intelligent scheduling and reminders, ensures safety through fall and anomaly detection, and fosters meaningful connections between caregivers, families, and elderly users.

## Key Features
- **Real-time Health Monitoring**: Continuously collects and analyzes data from wearable devices to track vital signs like heart rate, blood pressure, oxygen levels, and more. Alerts are generated in case of anomalies.
- **Safety & Activity Monitoring**: Employs motion sensors and behavioral analytics to detect falls, wandering, or any unusual activity patterns.
- **Medication Management**: Sends timely reminders for medication intake, tracks adherence, and notifies caregivers if a dose is missed.
- **Caregiver Coordination**: Securely connects family members, healthcare professionals, and support staff via an internal messaging system and event scheduling interface.
- **Social Engagement**: Recommends activities, local events, and online gatherings to reduce loneliness and promote mental well-being.
- **Central Orchestration**: Acts as the brain of the system, coordinating communication and task allocation between agents while managing data flow and analytics.

## Technology Stack
- **On-Premise LLMs**: Powered by Ollama to process natural language and make intelligent decisions while maintaining data privacy
- **Custom Agent Tools**:
  - API Integrations: Interfaces for wearables, health tracking, calendars, etc.
  - Web Scrapers: For extracting relevant external information (e.g., news, local events)
  - ML Models: For anomaly detection, predictive analytics, and personalization
- **Embedding Models**: Ollama-based embeddings for semantic search and context-aware information retrieval
- **SQLite Database**: A lightweight and efficient database system for local, serverless data storage
- **Next.js & TypeScript**: React-based web framework with TypeScript for a structured, maintainable frontend
- **Tailwind CSS**: Utility-first styling for responsive and accessible UI
- **Frontend Libraries**:
  - Recharts: For visualizing health and activity data
  - shadcn/ui: For reusable, accessible UI components
  - Lucide React: Iconography for intuitive UI elements

## Privacy & Security
Privacy is at the heart of SevaSahayak. The system is designed to operate fully on-premise, ensuring that sensitive personal data is never sent to external servers. Key security features include:
- **End-to-End Encryption**: All communication channels are encrypted to prevent unauthorized access
- **Role-Based Access Control (RBAC)**: Limits data access based on user roles (e.g., patient, doctor, family member)
- **Local Processing**: Eliminates reliance on cloud infrastructure, reducing the attack surface and latency

## Installation & Setup
To get started with SevaSahayak, follow these steps:

1. **Clone the Repository**
```bash
git clone https://github.com/your-org/sevasahayak.git
cd sevasahayak
```
2. **Install Dependencies**
```bash
npm install
```
3. **Set Up Ollama LLMs**
Ensure Ollama is installed and properly configured. Download the required LLM and embedding models.

4. **Configure the SQLite Database**
Create and initialize the database using provided schema files.
```bash
npm run db:init
```

5. **Run the Application**
```bash
npm run dev
```

The application will be available at `http://localhost:3000` by default.

## Agent Architecture
SevaSahayak operates using a modular agent-based architecture. Each agent functions independently with a defined purpose but communicates through the orchestration layer to ensure system-wide coherence.

### Agents
- **Health Monitoring Agent**: Interfaces with wearables and tracks vitals
- **Safety & Activity Agent**: Monitors movement and detects anomalies
- **Reminder & Schedule Agent**: Manages tasks, reminders, and alerts
- **Caregiver Coordination Agent**: Handles secure messaging and event scheduling
- **Social Engagement Agent**: Recommends personalized activities and companionship suggestions
- **Central Orchestration Agent**: Routes messages, logs data, and maintains system state

## Contribution Guidelines
We welcome contributions from the open-source community. Please refer to `CONTRIBUTING.md` for:
- Bug reports
- Feature requests
- Code submissions
- Design suggestions


SevaSahayak is built with care to care. Join us in shaping the future of elderly care—private, intelligent, and compassionate.

