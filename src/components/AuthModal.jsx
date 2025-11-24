import React from 'react';
import { useState } from 'react';
import { User, Mail, Lock, X } from 'lucide-react';

export function AuthModal({ mode = 'login', onClose, onSubmit }) {
  const [active, setActive] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    if (active === 'register') payload.name = name;
    if (onSubmit) onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 overflow-hidden">
        <div className="flex">
          {/* Left panel: visual / brand */}
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-red-600 p-8 items-center justify-center">
            <div className="text-white text-center">
              <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                <User size={32} />
              </div>
              <h3 className="text-2xl font-bold">Welcome to TheMealDB Explorer</h3>
              <p className="mt-2 text-sm opacity-90">Find recipes, save favorites and explore by category.</p>
            </div>
          </div>

          {/* Right panel: form */}
          <div className="w-full md:w-1/2 p-8">
            <div className="flex items-start justify-between">
              <div>
                <nav className="flex gap-2 bg-gray-100 rounded-full p-1">
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium ${active === 'login' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'}`}
                    onClick={() => setActive('login')}
                  >
                    Login
                  </button>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium ${active === 'register' ? 'bg-white shadow-sm text-red-600' : 'text-gray-600'}`}
                    onClick={() => setActive('register')}
                  >
                    Register
                  </button>
                </nav>
              </div>

              <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <X />
              </button>
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-gray-800">{active === 'login' ? 'Welcome back' : 'Create your account'}</h2>
            <p className="mt-1 text-sm text-gray-500">{active === 'login' ? 'Sign in to continue' : 'Join us and start exploring recipes'}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {active === 'register' && (
                <label className="block">
                  <span className="text-sm text-gray-600">Full name</span>
                  <div className="mt-1 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><User size={16} /></span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </label>
              )}

              <label className="block">
                <span className="text-sm text-gray-600">Email</span>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Mail size={16} /></span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Password</span>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400"><Lock size={16} /></span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-200"
                    placeholder="Enter a strong password"
                    required
                  />
                </div>
              </label>

              <div className="flex items-center justify-between mt-2">
                <button type="submit" className="flex-1 mr-3 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium">{active === 'login' ? 'Sign in' : 'Create account'}</button>
                <button type="button" onClick={onClose} className="px-4 py-3 border rounded-xl text-sm">Cancel</button>
              </div>
            </form>

            <div className="mt-4 text-center text-sm text-gray-500">By continuing you agree to our terms and privacy.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
