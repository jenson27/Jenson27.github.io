import ProjectFilter from "../components/projects/ProjectFilter.jsx";
import EmptyMessage from "../components/content/EmptyMessage.jsx";
import HorizontalCard from "../components/content/HorizontalCard.jsx";
import Pagination from "../components/content/Pagination.jsx";
import ShopCard from "../components/content/ShopCard.jsx";
import BaseLayout from "../components/layout/BaseLayout.jsx";
import { entryPath, getEntries, PAGE_SIZE, sections } from "../lib/routes.js";

export default function ListPage({ route }) {
  const { section, tag, page } = route;
  const allEntries = getEntries(section).filter((entry) => !tag || entry.tags?.includes(tag));
  const totalPages = Math.max(1, Math.ceil(allEntries.length / PAGE_SIZE));
  const entries = allEntries.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const title = tag ? `${sections[section].label} - ${tag}` : sections[section].label;
  return (
    <BaseLayout activeItem={sections[section].active}>
      {section !== "store" && <div className="mb-5"><h1 className="w-full text-3xl font-bold">{title}</h1></div>}
      {entries.length === 0 ? <EmptyMessage section={section} /> : section === "projects" && !tag ? (
        <ProjectFilter projects={entries.map((entry) => ({ title: entry.title, description: entry.description, img: entry.thumbnail, badge: entry.badge, tags: entry.tags, url: entryPath(section, entry) }))} />
      ) : section === "store" ? (
        <ul>{entries.map((entry) => <li key={entry.slug}><ShopCard entry={entry} /></li>)}</ul>
      ) : (
        <ul>{entries.map((entry) => <li key={entry.slug}><HorizontalCard entry={entry} section={section} /></li>)}</ul>
      )}
      <Pagination section={section} page={page} totalPages={totalPages} tag={tag} />
    </BaseLayout>
  );
}
