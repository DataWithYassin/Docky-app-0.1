````markdown
# Docky Backend (scaffold)

This backend is a scaffold for the Docky front-end. It uses:
- Node.js + TypeScript + Express
- MongoDB (Mongoose)
- Redis-backed sessions (express-session + connect-redis)
- Simple route structure: /api/auth, /api/users, /api/shifts, /api/chats, /api/content

Quick start:
1. cd backend
2. cp .env.example .env and edit MONGODB_URI, REDIS_URL, SESSION_SECRET, CORS_ORIGIN
3. npm install
4. npm run dev

Notes:
- Session cookie name: `docky_sid` — the frontend must send credentials (fetch: credentials: 'include') to keep session cookies.
- In production, set cookie.secure = true, provide HTTPS, set appropriate sameSite and domain.
````