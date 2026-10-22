import { Link } from "react-router";
import { Home, BarChart3, Link as LinkIcon, Link2, Layers } from "lucide-react";
import Footer from "../components/Footer";
import { MdWarning } from "react-icons/md";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-primary">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="relative mb-6">
          <Link2 className="h-16 w-16 text-slate-300" strokeWidth={1.5} />
          <div className="absolute right-1 top-2 flex h-5 w-5 items-center justify-center rounded  bg-blue-600">
            <MdWarning className="h-3 w-3 text-white" />
          </div>
        </div>

        <h1 className="text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-lg font-semibold text-slate-900">
          Page Not Found
        </p>
        <p className="mt-2 max-w-md text-center text-sm text-slate-500">
          The page you're looking for doesn't exist. It may have been moved,
          deleted, or the link might be incorrect.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
          <Link
            to="/"
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-gray-50"
          >
            Report an Issue
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-3xl gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <BarChart3 className="h-6 w-6 text-slate-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Track Analytics
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              View clicks, locations and comprehensive metrics.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <LinkIcon className="h-6 w-6 text-slate-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Manage All Links
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Create short links and organize digital assets.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <Home className="h-6 w-6 text-slate-600" />
              </div>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Developer API
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Integrate with our powerful REST API.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default NotFound;
