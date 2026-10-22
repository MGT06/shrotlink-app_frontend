function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-4 px-10 py-9 text-[11px] font-medium uppercase tracking-wider text-slate-500 md:flex-row">
      <p>© 2024 ShortLink. The Digital Architect.</p>
      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        <a href="#" className="hover:text-slate-800">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-slate-800">
          Terms of Service
        </a>
        <a href="#" className="hover:text-slate-800">
          API Documentation
        </a>
        <a href="#" className="hover:text-slate-800">
          Support
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
