# MA AI Hackathon: Genuinely Inept

## Getting Started

### Prep
Crate `.env.local` file in the root of the project with the following values

```bash
OPENAI_API_KEY=
OPENAI_API_VERSION=
OPENAI_API_ENDPOINT=
OPENAI_API_DEPLOYMENT_NAME=
```

**NOTE: Deepseek model deployments have different API and are not suitable for this project.**

### Running with Docker

This should get all services going for you.

```bash
docker compose up -d
```

### Running projects separately

This repo has 2 parts 
- `api`
- `app`

#### `api`

This is back-end part scaffolded with [FastAPI](https://fastapi.tiangolo.com/#create-it) and [uv](https://docs.astral.sh/uv/getting-started/installation/)

To run the project

```bash
cd api
uv sync
uv run --env-file .env.local fasatapi dev
```

#### `app`

This is a React app with Vite. To run the project

```bash
cd app
yarn
yarn start
```