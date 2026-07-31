import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, posts, formatDate } from "../lib/posts";
import { usePageTitle } from "../lib/usePageTitle";
import { NotFound } from "./NotFound";

export function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;
  usePageTitle(post?.title);

  if (!post) return <NotFound />;

  const index = posts.indexOf(post);
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <article className="post wrap">
      <header className="post-header">
        <Link to="/writing" className="post-back">
          ← Writing
        </Link>
        <h1>{post.title}</h1>
        <p className="post-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="post-meta-tags">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </span>
        </p>
      </header>
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{post.body}</Markdown>
      </div>
      <nav className="post-nav" aria-label="More posts">
        {older ? (
          <Link to={`/writing/${older.slug}`}>
            <small>Older</small>
            {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link to={`/writing/${newer.slug}`} className="post-nav-next">
            <small>Newer</small>
            {newer.title}
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
