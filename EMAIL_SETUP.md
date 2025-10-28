Contact form / Email setup

This project includes a small Express server at `src/server.js` that accepts POST requests to `/api/contact` and sends email using Nodemailer. Credentials must be provided via environment variables.

Steps to enable email sending locally:

1. Copy `.env.example` to `.env` at the project root and fill in the values. Example:

   - Use SMTP settings (SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS) or
   - Use a provider service name (EMAIL_SERVICE) with EMAIL_USER and EMAIL_PASS (e.g., `gmail` + app password).

2. Install server dependencies (if not already installed):

```powershell
npm install nodemailer dotenv express cors body-parser
```

3. Start the server (example):

```powershell
# from project root
node src/server.js
```

4. In development, the frontend sends form data to `/api/contact` by default. If your API runs on a different origin, set `VITE_API_URL` in `.env` (for example `http://localhost:8081`).

Security notes:

- Never commit your real `.env` to version control. Use `.env.example` for documentation.
- For Gmail, prefer using an App Password instead of your primary account password.

If you want, I can also add a script to `package.json` to start the server with `nodemon`.
