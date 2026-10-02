# Project Report — Responsive Portfolio Website

## Objective

Deliver a responsive personal portfolio with frontend/backend integration, persistent contact messages, and deployment configuration.

## Profile and sections

The site presents K. Venkata Raviteja's introduction, education, skills, selected projects, and contact information. Update profile details, social URLs, and project links in `client/src/data/portfolio.js` before publication.

## Architecture

Browser → React/Vite frontend → Express REST API → MongoDB

The API exposes `GET /api/health` for service/database status and `POST /api/contact` for validated message submission. Stored messages are not publicly readable.

## Accessibility and responsiveness

- Layout adapts across desktop, tablet, and mobile widths.
- Mobile navigation exposes its expanded state to assistive technology.
- Contact fields have associated labels, native validation, and an announced submission status.
- Scroll reveals and smooth scrolling respect reduced-motion preferences.

## Security and reliability

- Server-side required-field, email, and length validation
- JSON request size limit, Helmet headers, exact-origin CORS allowlist, and contact API rate limiting
- MongoDB connectivity checked before accepting submissions
- Database credentials configured through environment variables
- No unauthenticated endpoint returns stored contact messages

## Deployment

Deploy `client` to Vercel and `server` to Render, then configure `VITE_API_URL`, `MONGODB_URI`, and `CLIENT_URL`. Follow the checklist in the root README and the setup guide in `DATABASE.md`. Live URLs and the GitHub repository link remain to be added after publication.

## Final verification checklist

- [x] Build the frontend with `npm run build`
- [ ] Verify `/api/health` reports a connected database
- [ ] Submit a valid contact form and verify the saved document in Atlas
- [ ] Verify empty fields, malformed email, and oversize values are rejected
- [x] Check desktop and mobile layouts and keyboard navigation
- [x] Capture `docs/screenshots/desktop.png` and `docs/screenshots/mobile.png`
- [ ] Publish the repository and add frontend/API links to the root README
