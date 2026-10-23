async function request(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {}
    throw new Error(message);
  }
  return res.json();
}

export const fetchPosts = (page = 1, limit = 5, signal) =>
  request(`/api/posts?page=${page}&limit=${limit}`, signal);

export const fetchPost = (slug, signal) =>
  request(`/api/posts/${encodeURIComponent(slug)}`, signal);
