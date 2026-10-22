import { useEffect, useState } from "react";
import { Copy, Trash2, Eye, Link as LinkIcon, SlidersHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getLinksThunk, deleteLinkThunk } from "../redux/slices/linksSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { links, isPending } = useSelector((state) => state.linksState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    dispatch(
      getLinksThunk({
        search: debouncedSearch,
        sort: sort,
        page: page,
        limit: 10,
      })
    );
  }, [dispatch, debouncedSearch, sort, page]);

  const handleCopy = (slug) => {
    navigator.clipboard.writeText(`${import.meta.env.VITE_API_URL}/r/${slug}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteLinkThunk(id)).unwrap();
      dispatch(
        getLinksThunk({
          search: debouncedSearch,
          sort: sort,
          page: page,
          limit: 10,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", " •")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
              My Links
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and track your shortened digital cards.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Total Active
            </p>
            <p className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {links.length}
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or URL..."
            className="w-full flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSort(sort === "asc" ? "desc" : "asc")}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="sm:inline">Sort</span>
          </button>
        </div>

        {isPending ? (
          <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-white py-16">
            <p className="text-sm text-slate-500">Loading...</p>
          </div>
        ) : links.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-center">
            <LinkIcon className="h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No links found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {debouncedSearch
                ? "Try adjusting your search query"
                : "Get started by creating your first short link"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {links.map((link) => (
              <div
                key={link.id}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex-1">
                    <a
                      href={`${import.meta.env.VITE_APP_URL}/r/${link.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-blue-600 hover:underline"
                    >
                      {link.slug}
                    </a>
                    <p className="mt-1 break-all text-sm text-slate-600">
                      {link.original_url}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                      {formatDate(link.created_at)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5">
                      <Eye className="h-4 w-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {link.click}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(link.slug)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-gray-100"
                        aria-label="Copy link"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="rounded-lg p-2 text-slate-600 hover:bg-gray-100"
                        aria-label="Delete link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="w-full text-sm font-medium text-slate-600 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            ‹ Prev Page
          </button>
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
              {page}
            </button>
          </div>
          <button
            onClick={() => setPage(page + 1)}
            className="w-full text-sm font-medium text-slate-600 hover:text-slate-900 sm:w-auto"
          >
            Next ›
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
