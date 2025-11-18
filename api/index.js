// This file is at 'api/index.js'
import app from '../backend/app.js';

// --- THIS BLOCK IS FOR 'npm run dev' (local) ---
// Vercel will ignore this block in production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8081;
  app.listen(PORT, () => {
    console.log(`[local-dev] Server running on http://localhost:${PORT}`);
  });
}
// ------------------------------------------

// This is for Vercel. It exports your app as a serverless function.
export default app;