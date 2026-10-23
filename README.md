# Blog App (Node.js/Express + React)

## Backend
```bash
cd backend
npm install
npm start        # http://localhost:5000
```
- `GET /api/posts?page=1&limit=5` – paginated posts
- `GET /api/posts/:slug` – single post (404 if not found)

## Frontend
```bash
cd frontend
npm install
npm run dev      # http://localhost:5173 (proxies /api to :5000)
```

Run backend first, then frontend.
