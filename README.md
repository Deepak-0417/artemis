# Artemis

React + Express + MySQL app for selecting payroll earning/deduction codes and mapping them to GL accounts with optional cost center splits.

## Tech Stack

- Frontend: Vite, React, TypeScript, Tailwind, shadcn/ui, React Query
- Backend: Express, TypeScript, Sequelize
- Database: MySQL

## Setup

Install dependencies:

```bash
npm install
```

Create a local env file:

```bash
copy .env.example .env
```

Update `.env` with your MySQL details.

```env
PORT=3001
DATABASE_URL=mysql://user:password@localhost:3306/gl_export_wizard
DB_HOST=localhost
DB_PORT=3306
DB_NAME=gl_export_wizard
DB_USER=root
DB_PASSWORD=
DB_LOGGING=false
VITE_API_URL=/api
```

Use either `DATABASE_URL` or the individual `DB_*` values. If `DATABASE_URL` is set, the server uses it.

## Database

Create the database:

```sql
CREATE DATABASE gl_export_wizard;
```

Run the SQL files under `server/sql/` for the source/reference tables:

- `CEarn`
- `cded`
- `CDept1`
- `CDept2`
- `CDept3`
- `CDept4`
- `CDept5`

The app also expects these mapping tables to exist:

- `GLCodeMapping`
- `GLCodeMappingSplit`

These are used only for user-entered mapping inputs. The source payroll/cost-center tables remain read-only reference data.

## Run Locally

Run frontend and API together:

```bash
npm run dev:all
```

Or run separately:

```bash
npm run dev:api
npm run dev
```

Default URLs:

- Frontend: `http://localhost:8080`
- API: `http://localhost:3001`

Open the wizard with a company code in the URL:

```txt
http://localhost:8080/0250
```

The frontend passes `0250` as `co` to the API.

## Commands

```bash
npm run dev        # Start Vite frontend
npm run dev:api    # Start Express API with tsx watch
npm run dev:all    # Start frontend and API together
npm run build      # Build frontend
npm run build:api  # Type-check/build API
npm run build:all  # Build frontend and API
npm run lint       # Run ESLint
npm run test       # Run Vitest
```

On Windows PowerShell, if `npm` is blocked by execution policy, use:

```bash
npm.cmd run dev:all
```

## API Endpoints

Health:

```txt
GET /api/health
```

Reference data:

```txt
GET /api/earning-codes?co=0250
GET /api/deduction-codes?co=0250
GET /api/cost-center-tables?co=0250
```

Save mappings:

```txt
POST /api/gl-mappings
```

Example payload:

```json
{
  "co": "0250",
  "mappings": [
    {
      "codeType": "EARNING",
      "code": "1",
      "description": "Salary",
      "fallbackAccount": "5000",
      "splits": [
        {
          "ccTable": "CC1",
          "ccCode": "1",
          "ccName": "Front Door",
          "accountNumber": "5101",
          "sortOrder": 1
        }
      ]
    },
    {
      "codeType": "DEDUCTION",
      "code": "401K",
      "description": "401K Contribution",
      "fallbackAccount": "2100",
      "splits": []
    }
  ]
}
```

Saving is idempotent per `co`: the API replaces existing mappings for that company with the current submitted wizard state.

## Project Layout

```txt
src/                  React frontend
src/api/              Frontend API clients
src/components/       UI and wizard components
src/pages/            Route pages
server/src/           Express API
server/src/models/    Sequelize entities
server/src/routes/    Route registration
server/src/controllers/ Express request handlers
server/src/services/  Database/business logic
server/sql/           MySQL table scripts
shared/               Shared frontend API types
```
