import React from "react";
import { ChefHat, Sparkles } from "lucide-react";
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryCard } from './components/CategoryCard';
import { AreaCard } from './components/AreaCard';
import { MealCard } from './components/MealCard';
import { MealDetail } from './components/MealDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { LandingPage } from './components/LandingPage';
import { mealService } from './services/mealService';

function App() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('home');
  const [currentCategory, setCurrentCategory] = useState('');
  const [areas, setAreas] = useState([]);
  const [currentArea, setCurrentArea] = useState('');

  useEffect(() => {
    loadCategories();
    loadAreas();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await mealService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAreas = async () => {
    try {
      setLoading(true);
      const data = await mealService.getAreas();
      setAreas(data);
    } catch (error) {
      console.error('Error loading areas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setViewMode('search');
      const data = await mealService.searchMeals(query);
      setMeals(data);
    } catch (error) {
      console.error('Error searching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (category) => {
    try {
      setLoading(true);
      setViewMode('category');
      setCurrentCategory(category);
      const data = await mealService.getMealsByCategory(category);
      setMeals(data);
    } catch (error) {
      console.error('Error loading meals by category:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    try {
      setLoading(true);
      const meal = await mealService.getRandomMeal();
      setSelectedMeal(meal);
    } catch (error) {
      console.error('Error loading random meal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAreaClick = async (area) => {
    try {
      setLoading(true);
      setViewMode('area');
      setCurrentArea(area);
      const data = await mealService.getMealsByArea(area);
      setMeals(data);
    } catch (error) {
      console.error('Error loading meals by area:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleMealClick = async (id) => {
    try {
      setLoading(true);
      const meal = await mealService.getMealById(id);
      setSelectedMeal(meal);
    } catch (error) {
      console.error('Error loading meal details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setMeals([]);
    setCurrentCategory('');
  };

  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [authMessage, setAuthMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setAuthMessage('Please fill in all fields');
      return;
    }
    setCurrentUser({ email: loginEmail, name: 'User' });
    setAuthMessage(`Welcome back, ${loginEmail}!`);
    setLoginEmail('');
    setLoginPassword('');
    setShowLogin(false);
    setShowLanding(false);
    setViewMode('home');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      setAuthMessage('Please fill in all fields');
      return;
    }
    setCurrentUser({ email: registerEmail, name: registerName });
    setAuthMessage(`Welcome, ${registerName}! Account created.`);
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setShowRegister(false);
    setShowLanding(false);
    setViewMode('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLanding(true);
    setViewMode('home');
    setAuthMessage('Logged out successfully');
    setTimeout(() => setAuthMessage(''), 3000);
  };

  return (
    <div>
      {showLanding ? (
        <>
          <LandingPage
            onExplore={() => { setShowLanding(false); setViewMode('home'); }}
            onLogin={() => setShowLogin(true)}
            onRegister={() => setShowRegister(true)}
            authMessage={authMessage}
          />

          {showLogin && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Sign In to TheMealDB</h3>
                {authMessage && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium text-sm">✓ {authMessage}</p>
                  </div>
                )}
                <form onSubmit={handleLogin}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" 
                    type="email" 
                    placeholder="you@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required 
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-500" 
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required 
                  />
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowLogin(false)} className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition">Sign In</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showRegister && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Create Your Account</h3>
                {authMessage && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium text-sm">✓ {authMessage}</p>
                  </div>
                )}
                <form onSubmit={handleRegister}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" 
                    type="text"
                    placeholder="John Doe"
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required 
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-500" 
                    type="email"
                    placeholder="you@example.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required 
                  />
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-red-500" 
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required 
                  />
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowRegister(false)} className="px-4 py-2 text-gray-600 font-medium hover:text-gray-800 transition">Cancel</button>
                    <button type="submit" className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition">Create Account</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-3 group"
            >
              <div className="bg-gradient-to-br from-red-400 to-red-600 p-3 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow">
                <ChefHat className="text-white" size={28} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                TheMealDB Explorer
              </h1>
            </button>

            <div className="flex items-center gap-3">
              {currentUser && (
                <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Hi, {currentUser.name}!</span>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
              <button
                onClick={() => { setShowLanding(true); setViewMode('home'); setMeals([]); setCurrentCategory(''); setCurrentArea(''); }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-300 rounded-lg hover:border-red-500"
              >
                Back to Main
              </button>

              <button
                onClick={handleRandomMeal}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <Sparkles size={20} />
                I'm Feeling Hungry!
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading && <LoadingSpinner />}

        {!loading && viewMode === 'home' && (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard
                  key={category.idCategory}
                  category={category}
                  onClick={handleCategoryClick}
                />
              ))}
            </div>

            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse by Area</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {areas.map((area) => (
                  <AreaCard key={area.strArea || area} area={area} onClick={handleAreaClick} />
                ))}
              </div>
            </div>
          </div>
        )}

        {!loading && (viewMode === 'search' || viewMode === 'category' || viewMode === 'area') && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {viewMode === 'category' ? `${currentCategory} Recipes` : viewMode === 'area' ? `${currentArea} Recipes` : 'Search Results'}
              </h2>

              <button
                onClick={handleBackToHome}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Back to Categories
              </button>
            </div>

            {meals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No meals found. Try another search!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {meals.map((meal) => (
                  <MealCard
                    key={meal.idMeal}
                    meal={meal}
                    onClick={handleMealClick}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedMeal && (
        <MealDetail meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
        </>
      )}
    </div>
  );
}

export default App;
