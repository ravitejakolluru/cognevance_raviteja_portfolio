# Database Setup

The API uses MongoDB. For local development and deployment, create a MongoDB Atlas cluster and a database user with access to the portfolio database.

1. Configure Atlas network access for the machine or hosting provider running the API.
2. Copy `server/.env.example` to `server/.env` locally, or create environment variables in your host's dashboard.
3. Set `MONGODB_URI` to the Atlas connection string and replace its credential and cluster placeholders.
4. Set `CLIENT_URL` to the frontend origin. For local development, use `http://localhost:5173`; for deployment, use the exact Vercel origin. Multiple origins can be comma-separated.
5. Start the API and confirm `/api/health` reports `"database": "connected"`.

The database is named `raviteja_portfolio` in the sample URI. Mongoose creates the `contacts` collection when the first message is submitted.

## Contact document

| Field | Type | Required | Limit |
|---|---|---:|---:|
| `name` | String | Yes | 80 characters |
| `email` | String | Yes | 160 characters |
| `subject` | String | Yes | 160 characters |
| `message` | String | Yes | 3,000 characters |
| `createdAt` | Date | Auto | — |
| `updatedAt` | Date | Auto | — |

Messages are accepted through `POST /api/contact`. There is no public read endpoint; inspect stored messages through your authenticated MongoDB Atlas tools.

Do not commit credentials or `.env` files. Rotate any database password that has been accidentally published.
