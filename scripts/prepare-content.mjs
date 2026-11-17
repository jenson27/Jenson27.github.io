import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { unified } from "unified";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = resolve(root, "src/content");
const outputPath = resolve(root, "src/content.generated.json");
const collectionNames = ["blog", "project", "certificate", "store"];

const markdownProcessor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSanitize)
  .use(rehypeStringify);

const content = {};

for (const collectionName of collectionNames) {
  const directory = join(contentRoot, collectionName);
  const files = (await readdir(directory)).filter((file) => file.endsWith(".md")).sort();
  content[collectionName] = [];

  for (const file of files) {
    const source = await readFile(join(directory, file), "utf8");
    const parsed = matter(source);
    const bodyHtml = String(await markdownProcessor.process(parsed.content));

    content[collectionName].push({
      ...parsed.data,
      slug: basename(file, ".md"),
      bodyHtml,
    });
  }
}

await writeFile(outputPath, JSON.stringify(content, null, 2));
