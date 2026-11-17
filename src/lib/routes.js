import content from "../content.generated.json";
import createSlug from "./createSlug.js";

export const SITE_TITLE = "Jenson | Personal Portfolio";
export const SITE_DESCRIPTION = "Welcome to my site";
export const SITE_URL = "https://jenson27.github.io";
export const DEFAULT_IMAGE = "/websitePreview.png";
export const PAGE_SIZE = 10;

export const sections = {
  blog: { collection: "blog", label: "Blog", active: "blog" },
  projects: { collection: "project", label: "Project", active: "projects" },
  certificates: { collection: "certificate", label: "Certificate", active: "certificates" },
  store: { collection: "store", label: "Store", active: "store" },
};

function normalizePath(path) {
  const cleanPath = decodeURIComponent((path || "/").split(/[?#]/)[0]);
  return cleanPath.length > 1 ? cleanPath.replace(/\/+$/, "") : "/";
}

function routePath(path) {
  const cleanPath = normalizePath(path);
  return cleanPath === "/" ? "/" : `${cleanPath}/`;
}

export function entryPath(section, entry) {
  if (section === "store") return `/store/${entry.slug}`;
  return `/${section}/${createSlug(entry.title)}`;
}

export function getEntries(section) {
  const collection = sections[section]?.collection;
  const entries = [...(content[collection] || [])];

  if (section === "blog") {
    return entries.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  }

  if (section === "store") {
    return entries.sort((a, b) => new Date(b.updatedDate) - new Date(a.updatedDate));
  }

  return entries.sort((a, b) => a.slug.localeCompare(b.slug)).reverse();
}

export function resolveRoute(path) {
  const currentPath = normalizePath(path);

  if (currentPath === "/") return { type: "home" };
  if (currentPath === "/cv") return { type: "cv" };
  const tagMatch = currentPath.match(/^\/(blog|projects|certificates)\/tag\/([^/]+)(?:\/(\d+))?$/);
  if (tagMatch) {
    return {
      type: "list",
      section: tagMatch[1],
      tag: tagMatch[2],
      page: Number(tagMatch[3] || 1),
    };
  }

  const listMatch = currentPath.match(/^\/(blog|projects|certificates|store)(?:\/(\d+))?$/);
  if (listMatch) {
    return { type: "list", section: listMatch[1], page: Number(listMatch[2] || 1) };
  }

  const detailMatch = currentPath.match(/^\/(blog|projects|certificates|store)\/([^/]+)$/);
  if (detailMatch) {
    const [, section, slug] = detailMatch;
    const entry = getEntries(section).find((item) =>
      section === "store" ? item.slug === slug : createSlug(item.title) === slug
    );
    return entry ? { type: "detail", section, entry } : { type: "notFound" };
  }

  return { type: "notFound" };
}

export function getPageMeta(path) {
  const route = resolveRoute(path);
  let title = SITE_TITLE;
  let description = SITE_DESCRIPTION;
  let image = DEFAULT_IMAGE;
  let ogType = "website";

  if (route.type === "cv") title = "Resume";
  if (route.type === "list") {
    title = route.tag ? `${sections[route.section].label} - ${route.tag}` : sections[route.section].label;
  }
  if (route.type === "detail") {
    title = route.entry.title;
    description = route.entry.description;
    image = route.entry.thumbnail || route.entry.heroImage || DEFAULT_IMAGE;
    if (route.section !== "store") ogType = "article";
  }
  if (route.type === "notFound") title = "404: Not Found";

  return { title, description, image, ogType, url: `${SITE_URL}${routePath(path)}` };
}

export function getStaticRoutes() {
  const routes = new Set(["/", "/cv/"]);

  for (const section of Object.keys(sections)) {
    const entries = getEntries(section);
    const base = `/${section}/`;
    routes.add(base);

    const pageCount = Math.max(1, Math.ceil(entries.length / PAGE_SIZE));
    for (let page = 2; page <= pageCount; page += 1) routes.add(`${base}${page}/`);
    for (const entry of entries) routes.add(`${entryPath(section, entry)}/`);
    if (section === "store") continue;

    const tags = [...new Set(entries.flatMap((entry) => entry.tags || []))];
    for (const tag of tags) {
      const tagBase = `${base}tag/${encodeURIComponent(tag)}/`;
      const taggedEntries = entries.filter((entry) => entry.tags?.includes(tag));
      routes.add(tagBase);
      const tagPageCount = Math.max(1, Math.ceil(taggedEntries.length / PAGE_SIZE));
      for (let page = 2; page <= tagPageCount; page += 1) routes.add(`${tagBase}${page}/`);
    }
  }

  return [...routes];
}
