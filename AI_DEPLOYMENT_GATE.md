# Care360 AI — Deployment gate

The API is disabled unless CARE360_AI_PILOT_ENABLED=true. Do not set this variable in a public deployment until the security and clinical review gates are completed.

## Required environment configuration
- CARE360_ALLOWED_ORIGINS: exact approved website origin
- OPENAI_API_KEY: server-only secret
- CARE360_AI_MODEL: reviewed model identifier
- CARE360_AI_PILOT_ENABLED: false or unset until approval

## Mandatory before public enablement
1. Configure and verify managed per-IP and per-session rate limiting at the hosting edge. Origin headers are not authentication.
2. Configure bot/abuse detection, request size limits at the platform layer, and spend alerts.
3. Review logging to prevent collection of health information and identifiers.
4. Run npm test with Node 20+ and perform live endpoint tests.
5. Conduct clinician-led review of all safety and emergency wording. Keyword checks are NOT reliable triage.
6. Complete accessibility, mobile, and privacy reviews.
7. Verify domain routing from the static site to the serverless API. Static GitHub Pages does not execute /api/ai.js.
8. Obtain explicit production authorization.

## Tests
Run npm test from repository root. Tests are committed but their execution is not yet verified in a connected CI or runtime. The test suite does not establish clinical safety.

## Product access
Only patient/education is accepted by the endpoint. Care360 Plus and HMS have no AI permissions, patient record access, or backend integrations in this pilot.
