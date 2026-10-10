# Personal AI — Backend (Milestone 1)

FastAPI skeleton with in-memory mock data. No database, AI model, or scheduler is connected yet.

---

## Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## Run the server

```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

---

## Run tests

```bash
pytest tests/ -v
```

---

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Service health check |
| POST | `/chat` | Send a message; returns a demo stub reply |
| GET | `/memory` | List all memory items |
| PUT | `/memory/{id}` | Update a memory item by id |
| DELETE | `/memory/{id}` | Delete a memory item by id (204 on success, 404 if not found) |
| GET | `/things` | List commitments and tasks |
| GET | `/routines` | List routines |
| GET | `/skills` | List available agent skills |
| GET | `/permissions` | List tool permissions |
| PUT | `/permissions/{id}` | Update a permission's enabled flag |

### POST /chat — request

```json
{ "message": "My doctor appointment is November 3. Remind me three days before.", "user_id": "demo-user" }
```

### POST /chat — response

```json
{
  "reply": "I received your message. This is a demo stub — no AI, database, or scheduler is connected yet.",
  "action": {
    "type": "commitment_created",
    "title": "Demo response",
    "subtitle": "Milestone 1 stub only",
    "meta": "Real Nemotron + commitment logic comes in Milestone 2"
  }
}
```

---

## Connecting the mobile app (Person B)

1. Copy `.env.example` to `.env` inside the `PersonalAI/` directory (if it does not already exist).
2. Set the API URL:

   **Expo web / iOS Simulator / Android Emulator (same machine):**
   ```
   EXPO_PUBLIC_API_URL=http://localhost:8000
   ```

   **Physical device (must be on the same Wi-Fi network):**
   ```
   EXPO_PUBLIC_API_URL=http://<your-machine-LAN-ip>:8000
   ```

   Find your LAN IP with `ifconfig` (macOS/Linux) or `ipconfig` (Windows). Look for the `en0`/`eth0` address starting with `192.168.x.x` or `10.x.x.x`.

3. Add the same IP to `CORS_ORIGINS` in `backend/.env`:
   ```
   CORS_ORIGINS=http://localhost:8081,http://localhost:19006,http://192.168.x.x:8081
   ```

> Note: `localhost` from a physical phone does not reach the host machine. Always use the LAN IP for physical devices.

---

## What is implemented (Milestone 1)

- FastAPI app with CORS
- All 10 API endpoints returning in-memory mock data
- Pydantic request/response validation matching TypeScript types exactly
- Automated tests for every endpoint

## What remains for Milestone 2

| Feature | Status |
|---------|--------|
| NVIDIA Nemotron via Nebius Token Factory | Not started |
| PostgreSQL database & Alembic migrations | Not started |
| Persistent memory (real CRUD) | Not started |
| Agent orchestrator | Not started |
| Commitment extraction & NLP | Not started |
| Background scheduler (APScheduler / Celery) | Not started |
| Push notification reminders | Not started |
| MCP tool integrations | Not started |
| Permission enforcement at runtime | Not started |
| Authentication & security hardening | Not started |
| Real routine/task tracking | Not started |

---

*Built by Liew Yu En (Person A — backend) for the NVIDIA Global AI Hackathon Personal AI project.*
*Mobile app (Person B — Lee Zhi Wei) uses React Native + Expo.*
