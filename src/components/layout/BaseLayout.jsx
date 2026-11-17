import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";

export default function BaseLayout({ activeItem, includeSidebar = true, children }) {
  return (
    <div className="drawer bg-base-100 lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-base-100">
        <Header />
        <div className="md:flex md:justify-center"><main className="max-w-[100vw] p-6 pt-10 lg:max-w-[900px]">{children}</main></div>
        <Footer />
      </div>
      {includeSidebar && <Sidebar activeItem={activeItem} />}
    </div>
  );
}
