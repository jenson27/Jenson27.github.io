import React from "react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { renderToString } from "react-dom/server";
import { build, createServer } from "vite";
import createSlug from "../src/lib/createSlug.js";
import "./prepare-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const siteUrl = "https://jenson27.github.io";

process.chdir(root);
await build({ configFile: resolve(root, "vite.config.js") });

const viteServer = await createServer({
  configFile: resolve(root, "vite.config.js"),
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "silent",
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

function makeMetadata(metadata) {
  const imageUrl = new URL(metadata.image, siteUrl).href;
  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="generator" content="React and Vite" />`,
    `<meta property="og:type" content="${escapeHtml(metadata.ogType)}" />`,
    `<meta property="og:url" content="${escapeHtml(metadata.url)}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${escapeHtml(metadata.url)}" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
  ].join("\n    ");
}

function outputPath(route) {
  if (route === "/") return resolve(dist, "index.html");
  const directory = decodeURIComponent(route.replace(/^\/|\/$/g, ""));
  return resolve(dist, directory, "index.html");
}

try {
  const { default: App, getPageMeta, getStaticRoutes } = await viteServer.ssrLoadModule("/src/App.jsx");
  const template = await readFile(resolve(dist, "index.html"), "utf8");

  async function writePage(route, outputFile = outputPath(route)) {
    const markup = renderToString(React.createElement(App, { path: route }));
    const html = template
      .replace("<!--PAGE_META-->", makeMetadata(getPageMeta(route)))
      .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);

    await mkdir(dirname(outputFile), { recursive: true });
    await writeFile(outputFile, html);
  }

  const routes = getStaticRoutes();
  for (const route of routes) await writePage(route);
  await writePage("/404", resolve(dist, "404.html"));

  const content = JSON.parse(await readFile(resolve(root, "src/content.generated.json"), "utf8"));
  const blogItems = content.blog.map((entry) => {
    const link = `${siteUrl}/blog/${createSlug(entry.title, entry.slug)}/`;
    return `<item><title>${escapeXml(entry.title)}</title><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><pubDate>${new Date(entry.pubDate).toUTCString()}</pubDate><description>${escapeXml(entry.description)}</description></item>`;
  }).join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Jenson | Personal Portfolio</title>
    <description>Welcome to my site</description>
    <link>${siteUrl}/</link>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
    ${blogItems}
  </channel>
</rss>`;

  await writeFile(resolve(dist, "rss.xml"), rss);

  const sitemapEntries = routes.map((route) => `<url><loc>${escapeXml(`${siteUrl}${route}`)}</loc></url>`).join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;
  await writeFile(resolve(dist, "sitemap.xml"), sitemap);
  await writeFile(resolve(dist, "sitemap-0.xml"), sitemap);
  await writeFile(resolve(dist, "sitemap-index.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${siteUrl}/sitemap-0.xml</loc></sitemap>
</sitemapindex>`);
} finally {
  await viteServer.close();
}
