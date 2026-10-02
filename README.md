# Responsive Portfolio Website

A responsive, full-stack portfolio for **K. Venkata Raviteja**, built with React, Vite, Express, and MongoDB.

## Features

- Responsive home, about, skills, projects, and contact sections
- Keyboard-accessible mobile navigation, reduced-motion support, and scroll-reveal animations
- Contact form connected to an Express API, with server-side validation and MongoDB persistence
- API rate limiting, Helmet security headers, and configurable CORS
- Vercel and Render deployment configuration

## Tech stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB / MongoDB Atlas
- **Hosting:** Vercel (frontend), Render (API), MongoDB Atlas (database)

## Run locally

Prerequisites: Node.js 20 or newer and a MongoDB connection string.

From the repository root:

```sh
npm install
npm run install:all
```

Copy `server/.env.example` to `server/.env`, then set `MONGODB_URI` to your MongoDB connection string. Never commit the `.env` file.

```sh
npm run dev
```

- Frontend: http://localhost:5173
- API health: http://localhost:5000/api/health

Without `MONGODB_URI`, the API starts in a degraded state and contact submissions return `503`; set up the database before testing the form end to end.

See [database setup](./docs/DATABASE.md) and [project report](./docs/PROJECT_REPORT.md) for more information.

## API

### `GET /api/health`

Returns API and database connectivity. Responds with `200` when MongoDB is connected and `503` otherwise.

### `POST /api/contact`

Stores a contact message. All fields are required; limits are 80 characters for `name`, 160 for `email` and `subject`, and 3,000 for `message`.

```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "subject": "Hello",
  "message": "Your message"
}
```

The API intentionally does not expose a public endpoint for reading stored messages.

## Deployment

1. Create a MongoDB Atlas database and user; configure network access for the deployed API.
2. Deploy the repository's `server` directory to Render. Set `MONGODB_URI` and `CLIENT_URL` in the service environment. `CLIENT_URL` must be the deployed frontend origin (no trailing slash); multiple comma-separated origins are supported.
3. Deploy the `client` directory to Vercel and set `VITE_API_URL` to the deployed API origin (no trailing slash).
4. Redeploy both services after adding environment variables, then test the health endpoint and submit a test message.
5. Add the resulting live URLs and public GitHub repository URL below once deployment and repository publication are complete.

- **Live website:** Not deployed yet
- **API health:** Not deployed yet
- **GitHub repository:** Not published yet

## Screenshots

Desktop and mobile screenshots are included at `docs/screenshots/desktop.png` and `docs/screenshots/mobile.png`. They show the local frontend; a live deployment is still pending. See [screenshot instructions](./docs/screenshots/README.txt).
