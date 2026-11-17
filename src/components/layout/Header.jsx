export default function Header() {
  return (
    <div className="sticky top-0 z-30 flex h-16 w-full justify-center bg-base-100 bg-opacity-90 text-base-content shadow-sm backdrop-blur transition-all duration-100 lg:hidden">
      <div className="navbar">
        <div className="navbar-start">
          <label htmlFor="my-drawer" className="btn btn-square btn-ghost" aria-label="Open menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
        <div className="navbar-center"><a className="btn btn-ghost text-xl normal-case" href="/">Jenson</a></div>
      </div>
    </div>
  );
}
