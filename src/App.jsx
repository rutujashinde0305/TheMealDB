import React from "react";
import { ChefHat, Sparkles } from "lucide-react";
import { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { CategoryCard } from './components/CategoryCard';
import { MealCard } from './components/MealCard';
import { MealDetail } from './components/MealDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { mealService } from './services/mealService';
import { AuthModal } from './components/AuthModal';

function App() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('home');
  const [currentCategory, setCurrentCategory] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'

  useEffect(() => {
    loadCategories();
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

  const handleAuthOpen = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuth(true);
  };

  const handleAuthSubmit = (data) => {
    // For now, simulate successful login/register. In a real app you'd call an auth API.
    console.log('Auth submit', authMode, data);
    setLoggedIn(true);
    setShowAuth(false);
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

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-white">
        <div className="max-w-3xl w-full p-8">
          <div className="bg-white/90 rounded-2xl p-10 shadow-lg text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">TheMealDB Explorer</h1>
            <p className="text-gray-700 mb-6">Browse recipes, explore categories, and find inspiration. Please login or register to continue.</p>

            <div className="flex items-center justify-center gap-4">
              <button onClick={() => handleAuthOpen('login')} className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg">Login</button>
              <button onClick={() => handleAuthOpen('register')} className="px-6 py-3 border border-red-500 text-red-600 rounded-lg">Register</button>
            </div>
          </div>
        </div>
        {showAuth && <AuthModal mode={authMode} onClose={() => setShowAuth(false)} onSubmit={handleAuthSubmit} />}
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-white">
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

            <button
              onClick={handleRandomMeal}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles size={20} />
              I'm Feeling Hungry!
            </button>
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
          </div>
        )}

        {!loading && (viewMode === 'search' || viewMode === 'category') && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">
                {viewMode === 'category' ? `${currentCategory} Recipes` : 'Search Results'}
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
    </div>
  );
}

export default App;
