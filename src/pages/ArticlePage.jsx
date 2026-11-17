import dayjs from "dayjs";
import BaseLayout from "../components/layout/BaseLayout.jsx";
import { sections } from "../lib/routes.js";

export default function ArticlePage({ route }) {
  const { entry, section } = route;
  const image = entry.thumbnail || entry.heroImage;
  return (
    <BaseLayout activeItem={sections[section].active}>
      <main className="md:flex md:justify-center"><article className="prose prose-lg max-w-[750px] prose-img:mx-auto">
        {image && <img src={image} alt={entry.title} className="mb-6 w-full" />}
        <h1 className="title my-2 text-4xl font-bold">{entry.title}</h1>
        {entry.pubDate && <time>{dayjs(entry.pubDate).format("MMM D, YYYY")}</time>}<br />
        {entry.badge && <div className="badge badge-secondary my-1">{entry.badge}</div>}
        {entry.tags?.map((tag) => <a key={tag} href={`/${section}/tag/${encodeURIComponent(tag)}`} className="badge badge-outline ml-2 no-underline">{tag}</a>)}
        {entry.updatedDate && <div>Last updated on <time>{entry.updatedDate}</time></div>}
        <div className="divider my-2" /><div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
      </article></main>
    </BaseLayout>
  );
}
