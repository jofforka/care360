# Care360 shared AI pilot (review branch)

## What is implemented
- `ai.html`, `ai.css`, `ai.js`: website-level educational preview with deterministic emergency interruption and a no-patient-data notice.
- `api/ai.js`: server-only, provider-key-protected educational endpoint; allows only `patient/education`. It deliberately refuses personalized concerns.
- Planned single gateway scope: `patient`, `plus`, `hms`, each with independently authorized capabilities. Plus and HMS are NOT enabled.

## Important deployment notes
This repository's current GitHub Pages hosting serves static assets **only**. GitHub Pages does not execute `api/ai.js`; the interactive safety demonstration still works, but the AI educational endpoint returns a fallback unless a backend is deployed and wired in.

Deploy the API on Vercel or an equivalent secure Node host, and route `/api/ai` from the website to that backend using a configured same-origin proxy or approved API endpoint. Never put `OPENAI_API_KEY` in browser code.

Server environment: `OPENAI_API_KEY`, `CARE360_ALLOWED_ORIGINS` (comma-separated exact origins), optional `CARE360_AI_MODEL`.

**Do not enable the API for public traffic as-is.** It still needs managed rate limits, bot/abuse protection, an authentication/authorization plan for each product, origin/CORS verification for actual cross-origin hosting, secure telemetry, privacy/legal review, and clinical evaluation. The keyword safety matcher is an illustrative first layer, not a validated clinical triage engine; creative spellings or language variations may evade it. A clinician-approved emergency escalation system is required before real symptom intake.

Do not claim there is a working clinician referral or booking integration. Avoid collecting patient identifiable or medical information, including in provider/platform request logs. Verify data processor agreements, retention and residency obligations before real use.

## Acceptance testing
- On the static preview: emergency choice interrupts the flow immediately.
- Questions containing emergency cues should never be passed to the model.
- Personal health questions must receive refusal and professional direction.
- With API key unset, the API returns `503 ai_not_configured`.
- Unexpected origins return `403`; invalid product or purpose returns `400`.
- No browser API key; no patient records or HMS access.
- Keyboard, narrow-screen and screen-reader tests required before merge.

## Later API shape (NOT deployed)
Use one versioned `/v1/ai/interactions` gateway with signed user/session identity, verified product scopes, policy enforcement, case escalation, human handoff, and auditable tool calls. Do not use product names passed by the browser to grant privileges.
