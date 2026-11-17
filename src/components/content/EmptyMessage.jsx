export default function EmptyMessage({ section }) {
  return <div className="min-w-full w-full border-l-4 border-secondary bg-base-200 p-4"><p className="font-bold">Sorry!</p><p>There are no {section} to show at the moment. Check back later!</p></div>;
}
