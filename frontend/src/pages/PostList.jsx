import { Link, useSearchParams } from "react-router-dom";
import { fetchPosts } from "../api";
import useFetch from "../useFetch";
import { Loader, ErrorMessage } from "../components/Status";
import Pagination from "../components/Pagination";

const LIMIT = 5;

export default function PostList() {
  const [params, setParams] = useSearchParams();
  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);

  const { data, loading, error } = useFetch((signal) => fetchPosts(page, LIMIT, signal), [page]);

  const goTo = (n) => {
    setParams({ page: n });
    window.scrollTo({ top: 0 });
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={() => setParams({ page: 1 })} />;

  return (
    <>
      <h1>Latest Posts</h1>
      <div className="grid">
        {data.data.map((post) => (
          <article key={post.id} className="card">
            <span className="tag">{post.tag}</span>
            <h2><Link to={`/posts/${post.slug}`}>{post.title}</Link></h2>
            <p>{post.excerpt}</p>
            <small>{post.author} • {post.publishedAt}</small>
          </article>
        ))}
      </div>
      <Pagination pagination={data.pagination} onChange={goTo} />
    </>
  );
}
