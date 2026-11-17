export default function Pagination({ section, page, totalPages, tag }) {
  if (totalPages < 2) return null;
  const label = section === "blog" ? "posts" : section;
  const root = tag ? `/${section}/tag/${encodeURIComponent(tag)}` : `/${section}`;
  const hrefFor = (number) => number < 2 ? root : `${root}/${number}`;
  return (
    <div className="flex justify-between">
      {page > 1 ? <a href={hrefFor(page - 1)} className="btn btn-ghost mx-5 my-10">← Recent {label}</a> : <div />}
      {page < totalPages ? <a href={hrefFor(page + 1)} className="btn btn-ghost mx-5 my-10">Older {label} →</a> : <div />}
    </div>
  );
}
