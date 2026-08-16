# Frontend — Sentiment Analysis App

A vanilla JavaScript (ES modules) single-page app for registering clients and analyzing text sentiment through the backend API. Built with a layered class architecture (models → services → components → app) and a step-by-step wizard UI.

## Tech stack

- **Vanilla JavaScript** (ES modules, no build step, no framework)
- **Bootstrap 4.5.2** (via CDN) — base form styling
- **Tabler Icons** (webfont, via CDN) — icons used in the wizard and result cards
- **Live Server** (VS Code extension) — local dev server with auto-reload

No `npm install` or build step required — just open the folder with Live Server.

## Prerequisites

- The backend must be running on `http://localhost:8080` (see the Backend README)
- VS Code with the **Live Server** extension (or any static file server)

## Running the app

1. Open the `Frontend` folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The app opens at `http://127.0.0.1:5500` (or whichever port Live Server assigns).

> **Important:** if you open the parent folder (containing both `Backend` and `Frontend`) in VS Code instead of just `Frontend`, Live Server will also watch the backend's SQLite database file and auto-reload the page every time a client is registered (since that write touches `mydatabase.db`). Either open only the `Frontend` folder, or add a `liveServer.settings.ignoreFiles` rule in your VS Code settings to exclude `**/Backend/**` and `**/*.db`.

## Configuration

`services/fetch.js` holds the backend URLs and the app's own API key:

```javascript
const clientUrl = "http://localhost:8080/client";
const resultUrl = "http://localhost:8080/result";
const authUrl = "http://localhost:8080/auth/login";
const analyzeUrl = "http://localhost:8080/analyze";
const API_KEY = "..."; // must match the backend's own API_KEY (not GROQ_API_KEY)
```

> **Known limitation:** `API_KEY` lives in client-side JavaScript and is visible to anyone who opens the browser's dev tools. This is the same trade-off any purely static frontend has with a backend-protected API key — it's acceptable for a school project, but the worst case is someone spending your `/analyze` quota, not a leaked third-party secret (the real Groq key never leaves the backend).

## Architecture

The app is organized in four layers:

| Layer | Folder | Responsibility |
|---|---|---|
| Models | `models/` | Plain data classes (`Client`, `AnalysisResult`) — no HTTP, no DOM |
| Services | `services/` | Orchestration and raw HTTP calls (`fetch.js`, `ClientService`, `AnalysisService`, `showAlert`) |
| Components | `components/` | UI rendering and DOM event binding (`InscriptionForm`, `ResultForm`, `StepIndicator`, `LoadingButton`) |
| App | `App.js` / `index.js` | Wires everything together; the only place that knows the full user flow |

`fetch.js` is the single source of truth for every backend call and holds the in-memory JWT (`authToken`) issued at login. No other file talks to the network directly.

## User flow

1. **Step 1 — Register.** The user fills in personal data + a password. Clicking **Continuar**:
   - Calls `POST /client` (public, no auth needed) to create the account.
   - Immediately calls `POST /auth/login` with the same credentials to obtain a JWT (auto-login — the user never sees a separate login screen).
   - On success, the form is hidden and the wizard advances to step 2.
2. **Step 2 — Analyze.** The user types a text and clicks **Analizar texto**:
   - Calls `POST /analyze` (with the `X-API-KEY` header) to get a sentiment analysis from Groq AI.
   - Results are shown as colored cards (sentiment, irony, subjectivity, confidence).
3. **Save.** Clicking **Guardar resultado** calls `POST /result/{userName}` (with the JWT `Authorization: Bearer` header) to persist the result.

Every action button shows a Mercado-Pago-style loading bar while its request is in flight, then flashes green on success.

## Error handling

- Validation and network errors from the backend surface through `showAlert()` — a dismissible Bootstrap alert banner (`#alertBox`), not a blocking native `alert()`.
- If registration fails, the form stays enabled so the user can correct their input and retry — no page reload required.
- If the JWT expires (60 minutes) mid-session, `registerResult` shows an alert; the user needs to refresh and register again to get a new token, since there is no re-login screen for returning users.

## File structure

```
Frontend/
├── models/
│   ├── Client.js
│   └── AnalysisResult.js
├── services/
│   ├── fetch.js
│   ├── showAlert.js
│   ├── ClientService.js
│   └── AnalysisService.js
├── components/
│   ├── InscriptionForm.js
│   ├── ResultForm.js
│   ├── StepIndicator.js
│   └── LoadingButton.js
├── css/
│   ├── base.css
│   ├── stepIndicator.css
│   ├── wizardCard.css
│   ├── resultCards.css
│   └── buttonState.css
├── App.js
├── index.js
└── index.html
```

## Known limitations

- No screen for returning users to log back in without re-registering (see Error handling above).
- The frontend's `API_KEY` is visible in source (see Configuration above).
- No automated tests.