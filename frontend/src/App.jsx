import { Link, Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";

export default function App() {
  return (
    <>
      <header className="header">
        <Link to="/" className="logo">📝 My Blog</Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="*" element={<p>Page not found. <Link to="/">Go home</Link></p>} />
        </Routes>
      </main>
    </>
  );
}
