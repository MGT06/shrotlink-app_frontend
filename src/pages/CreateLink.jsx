import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye } from "lucide-react";
import { FaChartLine } from "react-icons/fa";
import { MdQrCode2 } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { createLinkThunk } from "../redux/slices/linksSlice";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreateLink() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { original_url: "", slug: "" },
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPending } = useSelector((state) => state.linksState);

  const customSlug = watch("slug");

  const onSubmit = async (dataInput) => {
    try {
      await dispatch(createLinkThunk(dataInput)).unwrap();
      navigate("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Link
          to="/dashboard"
          className="mb-6 flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Create New Short Link
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Transform your long URLs into smart, navigateable assets.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="original_url"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  DESTINATION URL *
                </label>
                <input
                  type="url"
                  {...register("original_url", {
                    required: "Destination URL is required",
                  })}
                  id="original_url"
                  placeholder="https://example.com/your-long-url"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.original_url && (
                  <p className="mt-1.5 text-xs text-red-500">
                    {errors.original_url.message}
                  </p>
                )}
                <p className="mt-1.5 text-xs text-slate-400">
                  Where should this short link redirect?
                </p>
              </div>

              <div>
                <label
                  htmlFor="slug"
                  className="mb-2 block text-sm font-semibold text-slate-900"
                >
                  CUSTOM SLUG (OPTIONAL)
                </label>
                <input
                  type="text"
                  {...register("slug")}
                  id="slug"
                  placeholder="short-link"
                  maxLength={6}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1.5 text-xs text-slate-400">
                  Leave blank to generate a random short identifier.
                </p>
              </div>

              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-2">
                  <Eye className="mt-0.5 h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-blue-600">
                      Live Preview
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      Your short link will be:{" "}
                      <span className="font-semibold text-blue-600">
                        {import.meta.env.VITE_APP_URL}/{customSlug || "my-custom-slug"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create Link"}
            </button>
            <Link
              to="/dashboard"
              className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <FaChartLine className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Real-time Analytics
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Track every click, location and website interaction with precision.
            </p>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <MdQrCode2 className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Auto-generated QR
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Each link generates an instant QR for high-touch campaigns.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default CreateLink;
