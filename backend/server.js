const express = require("express");
const cors = require("cors");
const posts = require("./data/posts.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// GET /api/posts?page=1&limit=5
app.get("/api/posts", (req, res) => {
  const page = parseInt(req.query.page ?? "1", 10);
  const limit = parseInt(req.query.limit ?? "5", 10);

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 50) {
    return res.status(400).json({ error: "Invalid pagination params. page >= 1 and 1 <= limit <= 50." });
  }

  const total = posts.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  // list view doesn't need full content
  const data = posts.slice(start, start + limit).map(({ content, ...rest }) => rest);

  res.json({
    data,
    pagination: { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
  });
});

// GET /api/posts/:slug
app.get("/api/posts/:slug", (req, res) => {
  const post = posts.find((p) => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
});

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
