import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import App from "./App.jsx";
import { getPageMeta } from "../lib/routes.js";

export default function ClientApp({ initialPath }) {
  const [path, setPath] = useState(initialPath);

  useEffect(() => {
    const updateMetadata = () => {
      const metadata = getPageMeta(path);
      document.title = metadata.title;

      const setMeta = (selector, attribute, value) => {
        let element = document.head.querySelector(selector);
        if (!element) {
          element = document.createElement("meta");
          document.head.appendChild(element);
        }
        element.setAttribute(attribute, value);
      };

      setMeta('meta[name="description"]', "name", "description");
      setMeta('meta[name="description"]', "content", metadata.description);
      setMeta('meta[name="title"]', "name", "title");
      setMeta('meta[name="title"]', "content", metadata.title);
      setMeta('meta[property="og:type"]', "property", "og:type");
      setMeta('meta[property="og:type"]', "content", metadata.ogType);
      setMeta('meta[property="og:url"]', "property", "og:url");
      setMeta('meta[property="og:url"]', "content", metadata.url);
      setMeta('meta[property="og:title"]', "property", "og:title");
      setMeta('meta[property="og:title"]', "content", metadata.title);
      setMeta('meta[property="og:description"]', "property", "og:description");
      setMeta('meta[property="og:description"]', "content", metadata.description);
      setMeta('meta[property="og:image"]', "property", "og:image");
      setMeta('meta[property="og:image"]', "content", new URL(metadata.image, location.origin).href);
      setMeta('meta[name="twitter:card"]', "name", "twitter:card");
      setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
      setMeta('meta[name="twitter:url"]', "name", "twitter:url");
      setMeta('meta[name="twitter:url"]', "content", metadata.url);
      setMeta('meta[name="twitter:title"]', "name", "twitter:title");
      setMeta('meta[name="twitter:title"]', "content", metadata.title);
      setMeta('meta[name="twitter:description"]', "name", "twitter:description");
      setMeta('meta[name="twitter:description"]', "content", metadata.description);
      setMeta('meta[name="twitter:image"]', "name", "twitter:image");
      setMeta('meta[name="twitter:image"]', "content", new URL(metadata.image, location.origin).href);
    };

    const navigate = (nextUrl) => {
      const changePage = () => {
        history.pushState({}, "", nextUrl.pathname + nextUrl.search + nextUrl.hash);
        flushSync(() => setPath(nextUrl.pathname));
        const drawer = document.getElementById("my-drawer");
        if (drawer) drawer.checked = false;
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      };

      if (document.startViewTransition) document.startViewTransition(changePage);
      else changePage();
    };

    const onClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) return;

      const link = event.target.closest("a[href]");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;

      const nextUrl = new URL(link.href, location.href);
      if (nextUrl.origin !== location.origin || (nextUrl.pathname === location.pathname && nextUrl.hash)) return;

      event.preventDefault();
      navigate(nextUrl);
    };

    const onPopState = () => {
      flushSync(() => setPath(location.pathname));
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    updateMetadata();

    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, [path]);

  return <App path={path} />;
}
