import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 md:px-12">
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-bold">ShortLink</h1>
        <div className="hidden items-center gap-6 text-sm md:flex">
          <a href="#" className="font-semibold text-blue-600">
            Dashboard
          </a>
          <a href="#" className="text-slate-600 hover:text-slate-900">
            Analytics
          </a>
          <a href="#" className="text-slate-600 hover:text-slate-900">
            Links
          </a>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/auth/login"
          className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          Login
        </Link>
        <Link
          to="/auth/register"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
