import { Link, useParams } from "react-router-dom";
import { fetchPost } from "../api";
import useFetch from "../useFetch";
import { Loader, ErrorMessage } from "../components/Status";

export default function PostDetail() {
  const { slug } = useParams();
  const { data: post, loading, error } = useFetch((signal) => fetchPost(slug, signal), [slug]);

  if (loading) return <Loader />;
  if (error)
    return (
      <>
        <ErrorMessage message={error} />
        <Link to="/">← Back to posts</Link>
      </>
    );

  return (
    <article className="detail">
      <Link to="/">← Back to posts</Link>
      <span className="tag">{post.tag}</span>
      <h1>{post.title}</h1>
      <small>By {post.author} • {post.publishedAt}</small>
      {post.content.split("\n\n").map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </article>
  );
}
