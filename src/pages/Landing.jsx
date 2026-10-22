import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Landing() {
  const [url, setUrl] = useState("");

  const handleShorten = () => {
    console.log("Shortening URL:", url);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <section className="flex flex-col items-center justify-center px-6 py-16 md:py-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
            Shorten URLs.{" "}
            <span className="text-blue-600">Share Easily.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
            Create short, memorable links for your team communications.
            Transform long, cumbersome URLs into powerful digital assets that
            drive engagement.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700">
              Get Started
            </button>
            <button className="rounded-lg border border-blue-600 bg-white px-8 py-3 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-50">
              Learn More
            </button>
          </div>
          <div className="mt-12 flex w-full flex-col gap-3 rounded-xl bg-white p-6 shadow-lg sm:flex-row">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste really long unformatted url (content-id-3323-r)..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleShorten}
              className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Shorten
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Landing;
