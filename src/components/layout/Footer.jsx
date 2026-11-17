export default function Footer() {
  return (
    <footer className="footer footer-center mb-5 block pt-10">
      <div className="pb-2">&copy; {new Date().getFullYear()} Jenson</div>
      <div className="inline opacity-75">Developed by <a href="/" className="font-bold">Jenson</a></div>
    </footer>
  );
}
