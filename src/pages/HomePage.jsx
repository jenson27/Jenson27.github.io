import content from "../content.generated.json";
import BaseLayout from "../components/layout/BaseLayout.jsx";
import { entryPath } from "../lib/routes.js";

export default function HomePage() {
  const projects = content.project || [];
  const featured = projects.find((project) => project.slug === "project4");
  const selected = ["project2", "project3"].map((slug) => projects.find((project) => project.slug === slug)).filter(Boolean);
  return (
    <BaseLayout activeItem="home">
      <section className="grid gap-10 pt-4 pb-16 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div>
          <p className="reveal mb-4 font-mono-code text-sm uppercase tracking-[0.18em] text-primary" style={{ animationDelay: "0ms" }}>Jenson's portfolio</p>
          <h1 className="reveal mb-5 font-display text-5xl font-extrabold leading-[1.05] md:text-6xl" style={{ animationDelay: "90ms" }}>Hey, I'm Jenson.</h1>
          <p className="reveal mb-5 font-display text-2xl font-semibold leading-snug md:text-3xl" style={{ animationDelay: "170ms" }}>I build interactive tools and playful web experiences.</p>
          <p className="reveal mb-8 max-w-[52ch] text-base leading-relaxed text-base-content/70" style={{ animationDelay: "250ms" }}>From mini-games to a tool that turns video into ASCII animation, I enjoy making software people can explore and use.</p>
          <div className="reveal flex flex-wrap items-center gap-3" style={{ animationDelay: "330ms" }}><a href="/projects" className="btn btn-primary">Explore my work</a><a href="/cv" className="btn btn-ghost border border-base-content/15">View my CV</a></div>
        </div>
        {featured && <a href={entryPath("projects", featured)} className="reveal group block overflow-hidden rounded-3xl border border-base-content/10 bg-base-200/60 shadow-2xl transition hover:-translate-y-1 hover:border-primary/40" style={{ animationDelay: "200ms" }}>
          <div className="overflow-hidden"><img src={featured.thumbnail} alt="ASCIIMotion terminal preview" className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></div>
          <div className="flex items-center justify-between gap-4 p-5"><div><p className="mb-2 font-mono-code text-xs uppercase tracking-[0.16em] text-primary">Featured project</p><h2 className="font-display text-xl font-bold">{featured.title}</h2><p className="mt-1 text-sm text-base-content/65">Turn video into animated ASCII art.</p></div><span aria-hidden="true" className="text-2xl text-primary transition-transform group-hover:translate-x-1">↗</span></div>
        </a>}
      </section>
      <section className="pb-8">
        <div className="mb-5 flex items-end justify-between gap-4"><div><p className="mb-2 font-mono-code text-xs uppercase tracking-[0.16em] text-base-content/50">Selected work</p><h2 className="font-display text-2xl font-bold">More things I've built</h2></div><a href="/projects" className="link link-hover shrink-0 text-sm text-base-content/60">View all</a></div>
        <div className="grid gap-5 md:grid-cols-2">{selected.map((project) => <a key={project.slug} href={entryPath("projects", project)} className="group overflow-hidden rounded-2xl border border-base-content/10 bg-base-200/30 transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"><div className="overflow-hidden"><img src={project.thumbnail} alt={project.title} className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]" /></div><div className="p-5"><h3 className="font-display text-lg font-bold">{project.title}</h3><p className="mt-2 text-sm leading-relaxed text-base-content/65">{project.description}</p></div></a>)}</div>
      </section>
    </BaseLayout>
  );
}
