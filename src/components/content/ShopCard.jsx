import { entryPath } from "../../lib/routes.js";

export default function ShopCard({ entry }) {
  return (
    <>
      <a href={entryPath("store", entry)} className="block rounded-lg bg-base-100 transition hover:scale-[1.02] hover:shadow-xl">
        <div className="hero-content flex-col md:flex-row">
          {entry.heroImage && <img src={entry.heroImage} alt={entry.title} className="max-w-full rounded-lg md:max-w-[13rem]" />}
          <div className="w-full grow p-5 md:p-0">
            <h2 className="text-xl font-bold">{entry.title}{entry.badge && <span className="badge badge-secondary mx-2">{entry.badge}</span>}</h2>
            <div><span className="mr-1 text-xl">{entry.pricing}</span><span className="text-md opacity-50 line-through">{entry.oldPricing}</span></div>
            <p className="py-1">{entry.description}</p>
          </div>
        </div>
      </a>
      <div className="divider my-0" />
    </>
  );
}
