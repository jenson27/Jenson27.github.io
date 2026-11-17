import BaseLayout from "../components/layout/BaseLayout.jsx";

export default function StoreDetailPage({ entry }) {
  return (
    <BaseLayout activeItem="store">
      <main className="md:flex md:justify-center"><article className="prose prose-lg max-w-[750px] prose-img:mx-auto">
        {entry.heroImage && <img src={entry.heroImage} alt={entry.title} className="mb-6 w-full" />}
        <h1 className="title my-2 text-4xl font-bold">{entry.title}{entry.badge && <span className="badge badge-secondary mx-2">{entry.badge}</span>}</h1>
        <div className="flex place-content-between items-center"><div className="grow md:grow-0"><span className="mr-1 text-xl">{entry.pricing}</span><span className="text-md opacity-50 line-through">{entry.oldPricing}</span></div><div>{entry.custom_link && <a className="btn btn-outline ml-4" href={entry.custom_link} target="_blank" rel="noreferrer">{entry.custom_link_label}</a>}{entry.checkoutUrl && <a className="btn btn-primary ml-4" href={entry.checkoutUrl} target="_blank" rel="noreferrer">Buy Now</a>}</div></div>
        <div className="divider my-2" /><div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
      </article></main>
    </BaseLayout>
  );
}
