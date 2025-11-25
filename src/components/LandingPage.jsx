import React from 'react';
import { ChefHat, Search, Globe, Zap, ArrowRight } from 'lucide-react';

/**
 * @typedef {Object} LandingPageProps
 * @property {() => void} onExplore - Callback when user clicks Explore
 * @property {() => void} onLogin - Callback when user clicks Login
 * @property {() => void} onRegister - Callback when user clicks Register
 * @property {string} [authMessage] - Success/error message from authentication
 */

/**
 * LandingPage - Professional landing page with hero, features, and CTA
 * @param {LandingPageProps} props
 */
export function LandingPage({ onExplore, onLogin, onRegister, authMessage }) {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Auth Success Message */}
      {authMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-green-100 border border-green-400 text-green-700 px-6 py-3 rounded-lg shadow-lg animate-pulse">
          {authMessage}
        </div>
      )}
      {/* Header Navigation */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-400 to-red-600 p-2 rounded-lg">
              <ChefHat className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl text-gray-900">TheMealDB Explorer</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-gray-700 font-medium hover:text-red-600 transition"
            >
              Login
            </button>
            <button
              onClick={onRegister}
              className="px-4 py-2 text-gray-700 font-medium hover:text-red-600 transition"
            >
              Register
            </button>
            <button
              onClick={onExplore}
              className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition shadow-lg"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Explore <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Delicious Recipes</span> from Around the World
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover thousands of meals by category, cuisine, or search. Fast, cached, and running locally with our intelligent API proxy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExplore}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:from-red-600 hover:to-red-700 transition transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Start Exploring <ArrowRight size={20} />
              </button>
              <button
                onClick={onRegister}
                className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-xl font-semibold text-lg hover:border-red-500 hover:text-red-600 transition"
              >
                Sign Up Free
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              ✓ Browse 1000+ recipes  ✓ Filter by area/cuisine  ✓ Lightning-fast caching
            </p>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-full h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-red-200 to-orange-200 rounded-3xl blur-3xl opacity-60"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 flex items-center justify-center">
                <ChefHat size={120} className="text-red-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose TheMealDB Explorer?
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to discover amazing recipes, optimized for speed and ease.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="bg-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Search className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Search by meal name or ingredient. Get instant results with our intelligent local cache.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Globe className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Global Cuisines</h3>
              <p className="text-gray-600">
                Browse recipes from 25+ cuisines and areas. Explore authentic dishes from around the world.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Powered by an intelligent LRU cache with optional Redis. Your recipes load instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Sign Up', desc: 'Create your free account in seconds' },
              { step: '2', title: 'Explore', desc: 'Browse categories and cuisines' },
              { step: '3', title: 'Discover', desc: 'Find recipes matching your taste' },
              { step: '4', title: 'Cook', desc: 'Get step-by-step instructions' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to discover amazing recipes?
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Join thousands of food lovers exploring meals from around the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onExplore}
              className="px-8 py-4 bg-white text-red-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              Start Exploring Now
            </button>
            <button
              onClick={onRegister}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition"
            >
              Create Free Account
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-red-500 p-2 rounded-lg">
                  <ChefHat className="text-white" size={20} />
                </div>
                <span className="font-bold text-white">TheMealDB</span>
              </div>
              <p className="text-sm">Explore recipes from around the world.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 TheMealDB Explorer. All rights reserved. Powered by local API caching.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
