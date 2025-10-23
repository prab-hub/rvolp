"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setMessage("Thanks for joining! We'll be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Apple Style */}
      <nav className="backdrop-blur-xl bg-white/80 border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-[980px] mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="RevExOS"
                width={180}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <div className="flex gap-8 items-center">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                How it works
              </a>
              <a
                href="#waitlist"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-colors text-sm font-medium"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Apple Style */}
      <section className="pt-12 pb-24 overflow-hidden">
        <div className="max-w-[980px] mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-7xl font-semibold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Revenue and expense
            <br />
            tracking.
            <br />
            <span className="text-gray-400">Made simple.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-[600px] mx-auto font-normal">
            The only platform agencies and freelancers need to manage clients, projects, and profitability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <a
              href="#waitlist"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full transition-colors text-base font-medium"
            >
              Join the waitlist
            </a>
            <a
              href="#features"
              className="text-blue-600 hover:text-blue-700 text-base font-medium"
            >
              Learn more →
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-[1200px] mx-auto px-6 mt-16">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/hero.png"
              alt="RevExOS Pricing Simulator Dashboard"
              width={1400}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Feature Highlight 1 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=700&fit=crop&q=80"
                  alt="Professional using laptop"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
                Pricing that
                <br />
                adapts to you.
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                From one-time projects to complex subscriptions. Create flexible pricing models with setup fees, retainers, usage-based billing, and automatic discounts.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  One-time, subscription, and usage-based pricing
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tiered service packages (Basic, Pro, Enterprise)
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Automatic invoice generation from pricing rules
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight 2 */}
      <section className="py-24">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
                See profitability
                <br />
                at a glance.
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Link expenses to projects and understand your true margins. Make data-driven decisions about which services to offer and which clients are most valuable.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Real-time revenue and expense tracking
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Project-level profitability analysis
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Comprehensive reports by client and service
                </li>
              </ul>
            </div>
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=700&fit=crop&q=80"
                  alt="Analytics dashboard"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight 3 */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=700&fit=crop&q=80"
                  alt="Team working together"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-5xl font-semibold text-gray-900 mb-6 tracking-tight leading-tight">
                Built for
                <br />
                collaboration.
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Assign team members to clients and projects. Role-based permissions ensure everyone has access to what they need, nothing more.
              </p>
              <ul className="space-y-3 text-lg text-gray-600">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Team member assignments and permissions
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Client and project management in one place
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Shared visibility across your organization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32">
        <div className="max-w-[980px] mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 text-center mb-20 tracking-tight">
            How it works.
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl font-semibold text-blue-600">1</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Set up your services
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Define your pricing models, service tiers, and packages. As simple or complex as you need.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl font-semibold text-blue-600">2</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Add clients and projects
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Assign services to projects. RevExOS automatically generates invoices based on your pricing rules.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                  <span className="text-3xl font-semibold text-blue-600">3</span>
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Track and optimize
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Monitor expenses, payments, and profitability. Make smarter business decisions with real data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 text-center mb-20 tracking-tight">
            Everything you need.
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Flexible Pricing Engine",
                description: "One-time, subscription, and consumption-based pricing models all in one place.",
                icon: "💰"
              },
              {
                title: "Automated Invoicing",
                description: "Generate invoices automatically from your pricing rules. Track everything effortlessly.",
                icon: "📄"
              },
              {
                title: "Project Management",
                description: "Manage clients, assign teams, track services with powerful dashboards.",
                icon: "📊"
              },
              {
                title: "Service Tiers",
                description: "Organize offerings into Basic, Pro, Enterprise tiers. Easy for clients to choose.",
                icon: "📦"
              },
              {
                title: "Expense Tracking",
                description: "Track expenses by category and project. Know your true profitability.",
                icon: "💳"
              },
              {
                title: "Analytics & Reports",
                description: "Detailed revenue reports by client, service, and time period.",
                icon: "📈"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Style Section */}
      <section className="py-32">
        <div className="max-w-[800px] mx-auto px-6 text-center">
          <div className="mb-8">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80"
              alt="User testimonial"
              width={120}
              height={120}
              className="rounded-full mx-auto"
            />
          </div>
          <p className="text-3xl font-semibold text-gray-900 mb-8 leading-relaxed">
            &quot;RevExOS transformed how we manage our agency finances. We finally understand our true profitability.&quot;
          </p>
          <p className="text-lg text-gray-600">
            Michael Chen, Founder at Creative Studio
          </p>
        </div>
      </section>

      {/* Waitlist Section - Apple Style */}
      <section id="waitlist" className="py-32 bg-gray-50">
        <div className="max-w-[600px] mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 mb-6 tracking-tight">
            Join the waitlist.
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Be the first to experience the future of agency financial management.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-base text-gray-900 placeholder:text-gray-400"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {status === "loading" ? "Joining..." : "Get started"}
              </button>
            </div>

            {status === "success" && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-green-700 text-sm">
                {message}
              </div>
            )}

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm">
                {message}
              </div>
            )}
          </form>

          <p className="text-sm text-gray-500 mt-6">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer - Apple Style */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-[980px] mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#features" className="hover:text-gray-900">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-gray-900">How it works</a></li>
                <li><a href="#waitlist" className="hover:text-gray-900">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="mailto:contact@cloudifybiz.com" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Privacy</a></li>
                <li><a href="#" className="hover:text-gray-900">Terms</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="mailto:contact@cloudifybiz.com" className="hover:text-gray-900">Email</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© 2025 RevExOS. All rights reserved.</p>
            <p>Built for agencies and freelancers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
