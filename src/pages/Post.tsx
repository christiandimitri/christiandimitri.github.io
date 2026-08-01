import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPost, posts, formatDate } from "../lib/posts";
import { usePageTitle } from "../lib/usePageTitle";
import { useThemeValue } from "../lib/useThemeValue";
import { NotFound } from "./NotFound";

/** Images with a light-theme variant, keyed by their dark (default) src. */
const THEMED_IMAGES: Record<string, string> = {
  "/img/aec-agent-pipeline.svg": "/img/aec-agent-pipeline-light.svg",
};

function MdImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const theme = useThemeValue();
  const src =
    theme === "light" && props.src && THEMED_IMAGES[props.src]
      ? THEMED_IMAGES[props.src]
      : props.src;
  return <img {...props} src={src} loading="lazy" />;
}

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
          <span>{post.minutes} min read</span>
          <span className="post-meta-tags">
            {post.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </span>
        </p>
      </header>
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]} components={{ img: MdImage }}>
          {post.body}
        </Markdown>
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
