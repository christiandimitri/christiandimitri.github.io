import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getCaseStudy } from "../lib/caseStudies";
import { usePageTitle } from "../lib/usePageTitle";
import { NotFound } from "./NotFound";

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;
  usePageTitle(study?.title);

  if (!study) return <NotFound />;

  return (
    <article className="post wrap">
      <header className="post-header">
        <Link to="/" className="post-back">
          ← Work
        </Link>
        <h1>{study.title}</h1>
        <p className="post-meta">
          <span>{study.context}</span>
          <span>{study.year}</span>
        </p>
      </header>
      <div className="prose">
        <Markdown remarkPlugins={[remarkGfm]}>{study.body}</Markdown>
      </div>
    </article>
  );
}
