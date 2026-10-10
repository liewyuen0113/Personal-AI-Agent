# Personal AI Agent

> "Tell it once. It remembers. It follows through."

A mobile-first personal AI assistant built for the **Nebius × NVIDIA Global AI Hackathon**. Personal AI is an always-on assistant that remembers important things about you, tracks commitments, learns your routines, and helps you take action — all while keeping your data under your control.

---

## What It Does

Personal AI is not a generic chatbot. It is a proactive personal assistant built around five core concepts:

| Concept | Description | Example |
|---|---|---|
| **Memory** | Persistent facts about you | "I prefer morning workouts." |
| **Commitment** | Future follow-ups you delegate | "Remind me 3 days before my doctor appointment." |
| **Task** | Concrete work to be done | "Buy a new keyboard." |
| **Routine** | Recurring personal behaviour | Exercise, apartment cleaning |
| **Skill** | Reusable workflows | Weekly Planning, Meeting Preparation |

---

## Demo Flows

**Flow 1 — Commitment**
> "My doctor appointment is November 3. Remind me three days before."
→ AI creates a commitment and reminds you on October 31.

**Flow 2 — Calendar action**
> "Schedule two hours for my hackathon this Saturday morning."
→ AI checks your calendar, blocks 9:00–11:00 AM, confirms.

**Flow 3 — Routine tracking**
> "I cleaned my apartment today."
→ AI logs it. Later: "Your apartment cleaning routine is due soon."

**Flow 4 — Skill**
> "Every Sunday, help me plan my week."
→ AI runs the Weekly Planning skill using your calendar, tasks, and goals.

---

## Tech Stack

### Mobile (Frontend)
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | React Native |
| Toolchain | Expo (SDK 57) |
| Navigation | expo-router (file-based) |
| Storage | AsyncStorage |

### Backend (API)
| Layer | Technology |
|---|---|
| Language | Python |
| Framework | FastAPI |
| Server | Uvicorn |
| Database | PostgreSQL + pgvector |
| AI Model | NVIDIA Nemotron (via Nebius Token Factory) |
| Deployment | Nebius Serverless Endpoints |

---

## Project Structure

```
PersonalAI/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Home / Attention screen
│   │   ├── chat.tsx           # Chat screen
│   │   ├── things.tsx         # My Things (commitments + tasks)
│   │   ├── memory.tsx         # Memory panel
│   │   └── more.tsx           # More / Settings hub
│   ├── onboarding/
│   │   └── index.tsx          # 3-card onboarding flow
│   ├── routines.tsx
│   ├── skills.tsx
│   ├── connected-tools.tsx
│   └── permissions.tsx
├── components/
│   ├── ui/                    # Primitives: Card, Chip, Button, InputBar
│   ├── common/                # EmptyState, LoadingState, ErrorState
│   ├── chat/                  # MessageBubble, ActionCard, ToolExecutionCard, TypingIndicator
│   ├── home/                  # AttentionCard
│   ├── things/                # CommitmentCard, TaskCard
│   ├── memory/                # MemoryCard
│   ├── routines/              # RoutineCard, AISuggestionCard
│   ├── skills/                # SkillCard
│   ├── tools/                 # ToolRow
│   └── permissions/           # PermissionRow
├── constants/
│   └── theme.ts               # Colors, typography, spacing, shadows
├── types/
│   └── index.ts               # All TypeScript types
├── services/                  # API service layer (swap mock → real backend)
│   ├── api.ts
│   ├── chatService.ts
│   ├── memoryService.ts
│   ├── thingsService.ts
│   ├── routineService.ts
│   ├── skillService.ts
│   └── permissionService.ts
├── hooks/                     # useChat, useMemory, useThings, useRoutines
└── data/
    └── mockData.ts            # Mock data (replaced by backend in production)
```

---

## Screens

| Screen | Description |
|---|---|
| **Home** | "What needs my attention?" — urgent items, upcoming, routines |
| **Chat** | Conversational interface with action cards and tool execution states |
| **My Things** | Commitments and tasks, visually differentiated |
| **Memory** | Everything the AI knows about you — editable and deletable |
| **Routines** | Recurring behaviours with progress tracking and AI suggestions |
| **Skills** | Reusable workflows the AI can run on command |
| **Connected Tools** | Calendar, Tasks, Files, Email — connect what you choose |
| **Permissions** | Fine-grained control over what the AI can read and write |
| **Onboarding** | Lightweight 3-card intro, then straight into the app |

---

## Getting Started

### Prerequisites

- Node.js (LTS)
- Python 3.x
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Mobile App

```bash
cd PersonalAI
npx expo start
```

Scan the QR code with Expo Go. The app runs on mock data by default.

### Backend (coming)

```bash
cd backend
pip3 install -r requirements.txt
uvicorn main:app --reload
```

### Connect to Backend

Set the API base URL in `services/api.ts`:

```typescript
const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';
```

---

## Backend API Contract

The mobile app is loosely coupled to the backend via these endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/chat` | Send a message, receive AI reply + optional action |
| `GET` | `/memory` | Fetch all memories |
| `PUT` | `/memory/:id` | Edit a memory |
| `DELETE` | `/memory/:id` | Delete a memory |
| `GET` | `/things` | Fetch commitments and tasks |
| `GET` | `/routines` | Fetch routines |
| `GET` | `/skills` | Fetch skills |
| `GET` | `/permissions` | Fetch permissions |
| `PUT` | `/permissions/:id` | Update a permission toggle |

The mobile app contains **no AI logic** — all Nemotron, memory retrieval, and tool execution happens on the backend.

---

## Design

UI designed in Figma following a calm, premium, minimal visual language:

- **Colors**: warm off-white background (#F8F7F4), indigo accent (#4F46E5), white cards
- **Typography**: Inter / SF Pro, strong hierarchy
- **Principles**: proactive not passive, always show what the AI did, user stays in control

---

## Hackathon

Built for the **[Nebius × NVIDIA Global AI Hackathon](https://nebiusglobalaihackathon.devpost.com/)** — Personal AI track.

**Track requirements met:**
- ✅ NVIDIA Nemotron model (via Nebius Token Factory)
- ✅ Persistent memory across sessions
- ✅ Reusable skills
- ✅ Tool access (Calendar, Tasks, Files)
- ✅ Always-on via Nebius Serverless
- ✅ Privacy panel — user can view, edit, delete all memories

---

## Team

| Name | Role |
|---|---|
| Liew Yu En | Mobile (React Native + Expo) |
| Lee Zhi Wei | Backend (FastAPI + Nebius + Nemotron) |
