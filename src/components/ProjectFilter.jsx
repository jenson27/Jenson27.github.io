import { useMemo, useState } from "react";

/**
 * Client-side project search.
 * Astro passes the full project list in as a plain, serializable prop
 * (see pages/projects/[...page].astro). Everything below runs in the
 * browser, filtering the already-rendered data as the visitor types.
 */
export default function ProjectFilter({ projects }) {
    const [query, setQuery] = useState("");

    // Filter the project list based on the search query. This is memoized so that it only recalculates when the query or projects change.
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return projects;

        // Filter the projects by checking if the query is included in the title, description, or tags. The search is case-insensitive.
        return projects.filter((project) => {
            const haystack = [
                project.title,
                project.description,
                ...(project.tags || []),
            ]
                .join(" ")
                .toLowerCase();
            return haystack.includes(q);
        });
    }, [query, projects]);

    // Render the search input and the filtered project list. If no projects match the query, display a "No matches" message.
    return (
        <div>
            <label className="form-control w-full mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search projects..."
                    aria-label="Search projects"
                    className="input input-bordered w-full"
                />
            </label>
            {filtered.length === 0 ? (
                <div className="bg-base-200 border-l-4 border-secondary w-full p-4 min-w-full">
                    <p className="font-bold">No matches</p>
                    <p>Try a different search term.</p>
                </div>
            ) : (
                <ul>
                    {filtered.map((project) => (
                        <li key={project.url}>
                            <a href={project.url}>
                                <div className="rounded-lg bg-base-100 hover:shadow-xl transition ease-in-out hover:scale-[102%]">
                                    <div className="hero-content flex-col md:flex-row">
                                        {project.img && (
                                            <img
                                                src={project.img}
                                                alt={project.title}
                                                className="max-w-full md:max-w-[13rem] rounded-lg"
                                            />
                                        )}
                                        <div className="grow w-full">
                                            <h1 className="text-xl font-bold">
                                                {project.title}
                                                {project.badge && (
                                                    <div className="badge badge-secondary mx-2">
                                                        {project.badge}
                                                    </div>
                                                )}
                                            </h1>
                                            <p className="py-1 text-1xl">
                                                {project.description}
                                            </p>
                                            <div className="card-actions justify-end">
                                                {project.tags &&
                                                    project.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="badge badge-outline"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            <div className="divider my-0" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
