import { entryPath } from "../../lib/routes.js";

export default function HorizontalCard({ entry, section, href = entryPath(section, entry) }) {
  const image = section === "blog" ? entry.heroImage : entry.thumbnail;
  return (
    <>
      <article className="rounded-lg bg-base-100 transition hover:shadow-xl">
        <a href={href} className="hero-content flex-col md:flex-row">
          {image && <img src={image} alt={entry.title} className="max-w-full rounded-lg md:max-w-[13rem]" />}
          <div className="w-full grow">
            <h2 className="text-xl font-bold">{entry.title}{entry.badge && <span className="badge badge-secondary mx-2">{entry.badge}</span>}</h2>
            <p className="py-1">{entry.description}</p>
          </div>
        </a>
        {entry.tags?.length > 0 && <div className="flex justify-end gap-2 px-5 pb-3">{entry.tags.map((tag) => <a key={tag} href={`/${section}/tag/${encodeURIComponent(tag)}`} className="badge badge-outline">{tag}</a>)}</div>}
      </article>
      <div className="divider my-0" />
    </>
  );
}
