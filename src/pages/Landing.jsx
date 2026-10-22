import { useState } from "react";
import { Zap, PenTool, Gauge, CheckCircle } from "lucide-react";
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

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Architectural Features
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Built for Enterprise Precision
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Easy Create
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Instantly generate performance-plus links at scale or through our elegant API accounts.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <PenTool className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Custom Slugs
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Validate brand authority with readable, memorable links that resonate with your digital audience.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <Gauge className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">
                Team-Ready
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Manage access, departments with shared service dashboards, permissions, and unified analytics dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Dashboard Analytics"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Data-Driven Insights
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Observe your link architecture in real-time.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Every interaction, bar dashboard. Our dashboard provides surgical
                precision where your traffic originates, who is engaging, and how
                your team can optimize click-through across the globe.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Geographic Distribution Maps
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Device & Browser Breakdown
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      UTM Parameter Tracking
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Landing;
