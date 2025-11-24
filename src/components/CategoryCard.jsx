import React from "react";

export function CategoryCard({ category, onClick }) {
  return (
    <button
      onClick={() => onClick(category.strCategory)}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="aspect-square">
        <img
          src={category.strCategoryThumb}
          alt={category.strCategory}
          className="w-full h-full object-cover"
        />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-xl font-bold">{category.strCategory}</h3>
      </div>
  <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors" />
    </button>
  );
}
