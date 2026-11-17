import React from "react";
import HorizontalCard from "../components/content/HorizontalCard.jsx";
import BaseLayout from "../components/layout/BaseLayout.jsx";

export default function ServicesPage() {
  const services = ["Service 1", "Service 2", "Service 3", "Service 4"];
  return <BaseLayout activeItem="services"><h1 className="mb-5 w-full text-3xl font-bold">Services Header</h1>{services.map((title, index) => <React.Fragment key={title}><HorizontalCard href="#" section="services" entry={{ slug: title, title, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", thumbnail: "/post_img.webp", badge: index === 0 || index === 2 ? "NEW" : undefined }} /></React.Fragment>)}</BaseLayout>;
}
