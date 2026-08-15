# Backend — Sentiment Analysis API

A Spring Boot REST API for managing clients and analyzing text sentiment using Groq AI. Built with a layered architecture (controller → service → repository), JWT-based authentication for client resources, and API key authentication for the AI analysis endpoint.

## Tech stack

- **Java 25**
- **Spring Boot 3.5.16** (Web, Data JPA, Validation, Security)
- **Hibernate 6** / **SQLite** (via `hibernate-community-dialects`)
- **springdoc-openapi 2.8.5** — Swagger UI / OpenAPI docs
- **JWT (jjwt 0.12.6)** — token-based auth for client-facing endpoints
- **Groq AI** — sentiment analysis via LLM (OpenAI-compatible chat completions API)
- **Maven** (with wrapper — `mvnw` / `mvnw.cmd`, no local Maven install required)

## Prerequisites

- JDK 25 installed and available on your system
- A [Groq](https://console.groq.com) account and API key (free tier)

No local Maven installation is required — the project includes the Maven Wrapper.

## Environment variables

This project keeps all secrets out of source control. Set the following environment variables before running the app:

| Variable | Description |
| `GROQ_API_KEY` | API key from your Groq account, used by `/analyze` |
| `API_KEY` | Your own arbitrary secret string, used to protect `/analyze` via the `X-API-KEY` header |
| `JWT_SECRET` | A long, random string (32+ characters) used to sign JWT tokens |

**PowerShell (current session only):**
```powershell
$env:GROQ_API_KEY="your-groq-key"
$env:API_KEY="your-chosen-api-key"
$env:JWT_SECRET="a-long-random-secret-for-signing-jwts"
```

For a permanent setup, add these under Windows **System Properties → Environment Variables**, then restart your terminal/IDE so the new values are picked up.

## Running the app

```powershell
.\mvnw.cmd spring-boot:run
```

The server starts on `http://localhost:8080`.

## API documentation (Swagger)

```
http://localhost:8080/swagger-ui/index.html
```

Raw OpenAPI spec:
```
http://localhost:8080/v3/api-docs
```

Swagger's **Authorize** button exposes two independent security schemes — fill in whichever one the endpoint you're testing requires (see below).

## Domain model

- **Client** — a registered user (`name`, `lastName`, `userName`, `city`, `state`, `zipCode`, hashed `password`), with a one-to-many relationship to their saved analysis results.
- **ResultAnalysis** — a saved sentiment analysis result (`scoreTag`, `irony`, `subjectivity`, `agreement`, `confidence`) linked to a `Client`.

## Authentication

The API uses **two independent authentication schemes**, depending on the endpoint:

### 1. API Key — `/analyze`

Send your key in the `X-API-KEY` header:
```
X-API-KEY: <your API_KEY value>
```

### 2. JWT — `/client` (read), `/result`

1. Register a client with `POST /client` (public, no auth required).
2. Log in with `POST /auth/login` to receive a JWT:
   ```json
   { "userName": "...", "password": "..." }
   ```
3. Send the returned token on subsequent requests:
   ```
   Authorization: Bearer <token>
   ```
4. Tokens expire after **60 minutes**. Simply log in again to get a new one — there's no limit on how many times you can log in.

> Lost password: there is currently no password-reset flow. A forgotten password requires manual intervention on the database.

## Endpoints

| Method | Path | Auth | Description |
| `POST` | `/client` | Public | Register a new client |
| `GET` | `/client/id/{id}` | JWT | Get a client by id |
| `GET` | `/client/userName/{userName}` | JWT | Get a client by username |
| `POST` | `/auth/login` | Public | Log in, returns a JWT |
| `POST` | `/result/{userName}` | JWT | Save an analysis result for a client |
| `POST` | `/analyze` | API Key | Analyze text sentiment via Groq AI |

## Error handling

All endpoints return structured JSON error bodies via a centralized exception handler:

| Status | Cause |
| `400` | Validation failure (missing/invalid fields) or malformed JSON |
| `401` | Missing/invalid API key, missing/invalid/expired JWT, or wrong login credentials |
| `404` | Requested client/resource not found |
| `502` | The Groq AI service could not be reached or returned an unparseable response |

## Database

SQLite file-based database (`mydatabase.db`, created automatically on first run via `spring.jpa.hibernate.ddl-auto=update`).

> **Note:** SQLite's limited `ALTER TABLE` support means schema changes to existing entities are not always applied reliably by Hibernate's `update` mode. If you change an entity's fields, it's safest to delete `mydatabase.db` and let it be recreated on the next run.

## Known limitations

- No password-reset flow.
- No rate limiting on public endpoints (`POST /client`, `POST /auth/login`).
- `ddl-auto=update` is convenient for development but not a substitute for real migrations (e.g. Flyway/Liquibase) in production.

## Business rules

- **Client registration**
  - `name`, `lastName`, `userName`, `city`, `state`, `zipCode`, and `password` are all required — requests missing any of them are rejected with `400`.
  - `zipCode` must be a valid postal code (`0`–`99999`); it cannot be null or omitted.
  - Passwords are hashed with BCrypt before being persisted — the plain-text password is never stored or returned in any response.

- **Client lookup**
  - Looking up a client by `id` or `userName` that doesn't exist in the database returns `404`, not an empty/null response.

- **Result analysis**
  - A result can only be saved for an existing client. `POST /result/{userName}` with a `userName` that has no matching client returns `404` — no orphaned results are created.
  - Each result belongs to exactly one client; results are not shared or reassigned between clients.

- **Authentication**
  - A client must register (`POST /client`) before they can log in — there is no separate account-creation step.
  - Login requires an exact match between the provided password and the stored hash. Incorrect credentials return `401`, not `404` (to avoid leaking whether the error was in the username or the password).
  - JWTs are valid for 60 minutes from issuance. There is no refresh-token mechanism — once a token expires, the client must log in again to get a new one.
  - There is no limit on how many times a client can log in or how many valid tokens can exist at once.

- **Sentiment analysis**
  - `POST /analyze` requires a non-blank `text` field; empty or whitespace-only text is rejected with `400` before any call is made to Groq (to avoid wasting API quota).
  - The analysis result (`scoreTag`, `irony`, `subjectivity`, `agreement`, `confidence`) is not persisted automatically — the client must explicitly call `POST /result/{userName}` to save it.