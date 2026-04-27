# GL Export Wizard API

Backend scaffold for the GL Export Wizard.

## Layout

- `src/index.ts` starts the HTTP server.
- `src/app.ts` builds the Express app.
- `src/routes/` owns API route registration.
- `src/config/` owns environment and database configuration.
- `src/models/` owns Sequelize model registration.

Business APIs and MySQL-backed modules can be added under `src/modules/`.

## Database

The API uses Sequelize with MySQL. Configure either `DATABASE_URL` or the
individual `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD`
environment variables.
