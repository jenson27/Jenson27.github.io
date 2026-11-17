import SidebarFooter from "./SidebarFooter.jsx";

export default function Sidebar({ activeItem }) {
  const links = [["home", "Home", "/"], ["projects", "Projects", "/projects"], ["certificates", "Certificates", "/certificates"], ["cv", "CV", "/cv"]];
  return (
    <div className="drawer-side z-40">
      <label htmlFor="my-drawer" className="drawer-overlay" />
      <aside className="flex h-auto min-h-full w-[19rem] flex-col bg-base-200 px-2 pt-2 text-base-content">
        <a href="/" className="mx-auto mb-6 mt-5 block w-fit">
          <div className="avatar transition hover:scale-[1.02]"><div className="w-[8.5rem]"><img className="mask mask-circle" src="/profile.png" alt="Profile" /></div></div>
        </a>
        <ul className="menu menu-md grow shrink overflow-y-auto">
          {links.map(([id, label, href]) => <li key={id}><a className={`py-3 text-base ${activeItem === id ? "bg-base-300" : ""}`} href={href}>{label}</a></li>)}
          <li><a className="py-3 text-base" href="mailto:jenson27@hotmail.com" target="_blank" rel="noreferrer">Contact (E-mail)</a></li>
        </ul>
        <SidebarFooter />
      </aside>
    </div>
  );
}
