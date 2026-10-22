import { useEffect } from "react";
import { useParams } from "react-router";

function Redirect() {
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      window.location.href = `${import.meta.env.VITE_API_URL}/${slug}`;
    }
  }, [slug]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="text-sm text-slate-600">Redirecting...</p>
      </div>
    </div>
  );
}

export default Redirect;
