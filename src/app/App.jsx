import { resolveRoute } from "../lib/routes.js";
import ArticlePage from "../pages/ArticlePage.jsx";
import CvPage from "../pages/CvPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import ListPage from "../pages/ListPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import StoreDetailPage from "../pages/StoreDetailPage.jsx";

export default function App({ path }) {
  const route = resolveRoute(path);

  if (route.type === "home") return <HomePage />;
  if (route.type === "cv") return <CvPage />;
  if (route.type === "services") return <ServicesPage />;
  if (route.type === "list") return <ListPage route={route} />;
  if (route.type === "detail" && route.section === "store") return <StoreDetailPage entry={route.entry} />;
  if (route.type === "detail") return <ArticlePage route={route} />;
  return <NotFoundPage />;
}
