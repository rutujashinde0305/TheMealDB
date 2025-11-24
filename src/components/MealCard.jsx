import React from "react";

export function MealCard({ meal, onClick }) {
  return (
    <button
      onClick={() => onClick(meal.idMeal)}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
    >
  <div className="aspect-4/3 overflow-hidden">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{meal.strMeal}</h3>
        {'strCategory' in meal && (
          <p className="text-sm text-gray-600 mt-1">{meal.strCategory}</p>
        )}
      </div>
    </button>
  );
}
