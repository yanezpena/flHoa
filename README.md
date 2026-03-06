# flHoa Monorepo

NestJS API + Expo mobile app with shared TypeScript types.

## Stack

- **API:** NestJS, Prisma, PostgreSQL
- **Mobile:** Expo (React Native), TanStack Query
- **Shared:** `packages/shared` — types used by both apps

## Architecture

```mermaid
graph TD
    subgraph "Mobile App (Expo)"
        A1[Dashboard Screen]
        A2[Tickets Screen]
        A3[Assets Screen]
        A4[Vendors Screen]
        A5[Storm Events Screen]
        A6[Reports Screen]
        A1 --> A2
        A2 --> A3
        A3 --> A4
        A4 --> A5
        A5 --> A6
    end

    subgraph "NestJS API"
        B1[App Controller]
        B2[Users Controller]
        B3[Prisma Service]
        B1 --> B3
        B2 --> B3
    end

    subgraph "Database (PostgreSQL)"
        D1[User Table]
        D2[Tickets Table - Planned]
        D3[Assets Table - Planned]
        D4[Vendors Table - Planned]
    end

    subgraph "Shared Package"
        E1[Common Types]
        E2[Shared Utilities]
    end

    subgraph "Data Setup"
        F1[Docker Compose]
        F2[Initial SQL Script]
    end

    A1 -->|HTTP Requests| B1
    A2 -->|HTTP Requests| B2
    B3 -->|ORM Queries| D1
    B3 -.->|Future Queries| D2
    B3 -.->|Future Queries| D3
    B3 -.->|Future Queries| D4
    A1 -->|Imports| E1
    A2 -->|Imports| E1
    B1 -->|Imports| E1
    B2 -->|Imports| E1
    F1 -->|Sets up| D1
    F2 -->|Initializes| D1
```

## Prerequisites

- Node.js 18+
- pnpm 9+
- Docker (for PostgreSQL)

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start PostgreSQL

```bash
cd data && docker-compose up -d && cd ..
```

### 3. Configure API

```bash
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env if needed (default matches docker-compose)
```

### 4. Run migrations

If PostgreSQL is running (from step 2):

```bash
pnpm db:deploy
```

Or for dev, push schema without migration files:

```bash
pnpm db:push
```

## Development

### API (port 3000)

```bash
pnpm api
```

### Mobile

```bash
pnpm mobile
```

For a physical device, set `EXPO_PUBLIC_API_URL` in `apps/mobile/.env` to your machine's IP (e.g. `http://192.168.1.100:3000`).

## Scripts

| Command           | Description           |
| ----------------- | --------------------- |
| `pnpm api`        | Start API dev server  |
| `pnpm mobile`     | Start Expo dev server |
| `pnpm build`      | Build shared + API    |
| `pnpm db:migrate` | Run Prisma migrations |
| `pnpm db:studio`  | Open Prisma Studio    |

## Project structure

```
├── apps/
│   ├── api/          # NestJS + Prisma
│   └── mobile/       # Expo app
├── packages/
│   └── shared/       # Shared types
├── data/             # Docker Compose for Postgres
└── pnpm-workspace.yaml
```
