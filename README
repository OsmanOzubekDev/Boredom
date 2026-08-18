# Book Social Network & Management API

A secure RESTful API built with Node.js, Express, TypeScript, PostgreSQL, and Docker.

---

## 🛠 Tech Stack

* **Runtime & Framework:** Node.js, Express.js, TypeScript (`tsx` watch dev)
* **Database:** PostgreSQL
* **Containerization:** Docker & Docker Compose
* **Security & Auth:** JWT (JSON Web Token), `bcrypt` (Password Hashing)
* **API Testing:** Bruno / Postman

---

## 📂 Project Structure

```text
.
├── src/
│   ├── config/          # Database connection configuration (pg pool)
│   ├── controllers/     # Business logic and request/response handling
│   ├── middleware/      # JWT authentication and custom middleware
│   ├── routes/          # API endpoint definitions
│   └── index.ts         # Server entry point and Express configuration
├── .env                 # Environment variables
├── docker-compose.yml   # PostgreSQL service configuration
├── init.sql             # Database schema and table initialization script
├── package.json
└── tsconfig.json

1. Clone the Repository
git clone <REPOSITORY_URL>
cd PROJECT-FILE

2. Install Dependencies
npm install

3. Environment Variables Setup
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5433
DB_USER=admin
DB_PASSWORD=secretpassword
DB_NAME=book_app

JWT_SECRET=super_secret_jwt_key_12345

4. Start Docker Containers
To spin up the PostgreSQL database in Docker:
docker compose up -d

5. Initialize the Database Table
Apply the init.sql schema to the PostgreSQL database inside the container:
    PowerShell: Get-Content init.sql | docker exec -i book_app_db psql -U admin -d book_app
CMD / Bash: docker exec -i book_app_db psql -U admin -d book_app < init.sql

6. Run Development Server
npm run dev
Method	Endpoint	Description	Auth Required
GET	/healthz	Server health check	❌
POST	/api/auth/register	User registration	❌
POST	/api/auth/login	User login & JWT generation	❌
GET	/api/auth/me	Fetch authenticated user profile	✅

API Testing Examples (Bruno / Postman)
1. Health Check (serverTest)
    GET http://localhost:3000/healthz

2. User Register (signUp)
    POST http://localhost:3000/api/auth/register

    Body (JSON):
 {
  "username": "osman",
  "email": "osman@example.com",
  "password": "supersecretpassword"
}


3. User Login (login)

    POST http://localhost:3000/api/auth/login

    Body (JSON):
{
  "email": "osman@example.com",
  "password": "supersecretpassword"
}

Response:
{
  "message": "Giriş başarılı!",
  "token": "YOUR_JWT_TOKEN_HERE"
}

4. Protected Route Test (JWT test)
    GET http://localhost:3000/api/auth/me
    Headers:
        Authorization: Bearer <YOUR_JWT_TOKEN_HERE>

