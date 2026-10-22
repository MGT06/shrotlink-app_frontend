import { useState } from "react";
import { Copy, Trash2, Eye, Link as LinkIcon } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    {
      id: 1,
      shortCode: "ycs.biz/j8n2",
      originalUrl: "https://www.tiktok.com/sxk33lkjxdlkoiwe0xonxj-mxz...",
      createdAt: "OCT 12, 2023 • 3:45 PM",
      clicks: 0,
    },
    {
      id: 2,
      shortCode: "ycs.biz/jkfj02",
      originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ...",
      createdAt: "OCT 11, 2023 • 2:18 PM",
      clicks: 0,
    },
    {
      id: 3,
      shortCode: "ycs.biz/j8n3",
      originalUrl: "https://github.com/username/repository-name-descor...",
      createdAt: "OCT 10, 2023 • 1:47 AM",
      clicks: 0,
    },
    {
      id: 4,
      shortCode: "ycs.biz/nn2m2",
      originalUrl: "https://www.dribbble.com/shots/23532526-Privacy-Dashbo...",
      createdAt: "OCT 9, 2023 • 11:22 AM",
      clicks: 0,
    },
  ];

  const filteredLinks = links.filter(
    (link) =>
      link.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (shortCode) => {
    navigator.clipboard.writeText(`https://${shortCode}`);
  };

  const handleDelete = (id) => {
    console.log("Deleting link:", id);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Links</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage and track your shortened digital cards.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              Total Active
            </p>
            <p className="text-3xl font-bold text-slate-900">124</p>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or URL..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredLinks.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16 text-center">
            <LinkIcon className="h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              No links found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              {searchQuery
                ? "Try adjusting your search query"
                : "Get started by creating your first short link"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLinks.map((link) => (
              <div
                key={link.id}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <a
                      href={`https://${link.shortCode}`}
                      className="text-base font-semibold text-blue-600 hover:underline"
                    >
                      {link.shortCode}
                    </a>
                    <p className="mt-1 text-sm text-slate-600">
                      {link.originalUrl}
                    </p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                      {link.createdAt}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1">
                      <Eye className="h-4 w-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {link.clicks}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(link.shortCode)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-gray-100"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(link.id)}
                      className="rounded-lg p-2 text-slate-600 hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            <span>‹ Prev Page</span>
          </button>
          <div className="flex items-center gap-2">
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-gray-100">
              2
            </button>
            <button className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-gray-100">
              3
            </button>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            <span>Next ›</span>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
