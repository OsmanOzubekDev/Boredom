# 📚 Book & Library Management API

A robust, scalable backend service built with **Node.js**, **Express**, **TypeScript**, **PostgreSQL**, **MongoDB**, and **RabbitMQ**. Fully containerized with **Docker Compose** and documented using **Swagger/OpenAPI**.

---

## 🛠️ Tech Stack & Architecture

* **Core:** Node.js, Express, TypeScript
* **Databases (Polyglot Persistence):**
  * **PostgreSQL:** Handles structured entities (Books, Authors, Genres, Users).
  * **MongoDB:** Handles unstructured dynamic data (Book Reviews & Ratings).
* **Message Broker:** RabbitMQ (for asynchronous tasks/queues).
* **Testing & Quality:** Jest & Supertest (Integration Testing).
* **Documentation:** Swagger UI (OpenAPI 3.0).
* **Containerization:** Docker & Docker Compose.

---

## 🚀 Quick Start (Docker)

Ensure you have **Docker** and **Docker Compose** installed.

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd Boredom-main


🚀 Start all services:
    docker compose up -d --build    


    Access Services:

    API Docs (Swagger): http://localhost:3000/api-docs

    Base API Endpoint: http://localhost:3000/api

    RabbitMQ Dashboard: http://localhost:15672 (Guest / Guest)


🧪 Running Tests
        To run the Jest integration test suite inside your local environment:
            
            Bash
            npm test

📖 API Documentation & Testing

    Interactive API Explorer: Visit http://localhost:3000/api-docs to interactively test endpoints using Swagger UI.

    API Client: You can also use tools like Bruno or Postman to import endpoints and test authentication flows.