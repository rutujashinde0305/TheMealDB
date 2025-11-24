
import React from "react";
import { X, ExternalLink } from 'lucide-react';
export function MealDetail({ meal, onClose }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({ ingredient, measure });
    }
  }

  const youtubeEmbedUrl = meal.strYoutube?.replace('watch?v=', 'embed/');

  return (
  <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-800">{meal.strMeal}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full rounded-2xl shadow-lg"
              />
              <div className="flex gap-4 mt-4">
                <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  {meal.strCategory}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {meal.strArea}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                    <span className="font-medium">{item.measure}</span>
                    <span className="ml-2">{item.ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
            <div className="prose max-w-none">
              {meal.strInstructions.split('\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 mb-3 leading-relaxed">
                    {paragraph}
                  </p>
                )
              ))}
            </div>
          </div>

          {youtubeEmbedUrl && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Video Tutorial</h3>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                <iframe
                  src={youtubeEmbedUrl}
                  title={meal.strMeal}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition-colors"
            >
              Watch on YouTube
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
