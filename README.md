# TaskGlass - Containerized Todo Application

A simple, modern, and beautifully designed Todo application built to try out **Docker** and **GitHub Actions CI**.

The project consists of:
- **Frontend**: A static HTML/CSS/JS Single Page Application with dynamic glassmorphism aesthetics, hosted using **Nginx** (acting as both a static server and a reverse proxy for backend API calls).
- **Backend**: A lightweight **Express.js** REST API that handles CRUD actions on a task list stored in-memory.
- **Docker Compose**: Orchestrates both containers locally, enabling them to communicate on a shared network interface.
- **GitHub Actions CI**: A continuous integration pipeline that validates the backend test suite and builds the Docker images for production release.

---

## Project Structure

```text
todo/
├── .github/              # GitHub Actions workflows (located at repo root)
├── backend/              # Node.js Express Backend
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js
│   └── server.test.js
├── frontend/             # Nginx-hosted static Frontend
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── app.js
│   ├── index.html
│   └── style.css
├── docker-compose.yml    # Local multi-container Docker deployment
└── README.md
```

---

## Getting Started

### Prerequisites
Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Run with Docker Compose
To build and spin up the complete frontend and backend services:

1. Open your terminal and navigate to the `todo` directory:
   ```bash
   cd todo
   ```
2. Build and start the containers:
   ```bash
   docker compose up --build
   ```
3. Once running, open your browser and navigate to:
   - **Frontend App**: [http://localhost:8080](http://localhost:8080)
   - **Backend API Docs/Check**: [http://localhost:5000/api/todos](http://localhost:5000/api/todos)

To shut down the application:
```bash
docker compose down
```

---

## Local Development and Testing

If you want to run backend tests locally without Docker:

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies (including testing packages):
   ```bash
   npm install
   ```
3. Run the Jest integration test suite:
   ```bash
   npm test
   ```

---

## GitHub Actions CI Workflow

The workflow configuration is defined in [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). 

Every time you push code or open a pull request on the `main`, `master`, or `dev` branches, the CI runner will automatically:
1. Check out the codebase.
2. Setup Node.js.
3. Install dependencies in the backend.
4. Run Express API endpoint tests (`npm test`).
5. Verify both Dockerfiles build without any errors.
