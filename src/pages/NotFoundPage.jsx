import BaseLayout from "../components/layout/BaseLayout.jsx";

export default function NotFoundPage() {
  return <BaseLayout includeSidebar={false}><div className="text-center"><h1 className="mb-4 text-9xl font-bold">😿</h1><h2 className="mb-2 text-9xl font-bold">404</h2><h3 className="text-2xl">The page you're looking for couldn't be found.</h3><a href="/" className="btn btn-primary mt-9">Home</a></div></BaseLayout>;
}
