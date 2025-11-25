import React from 'react';

export function AreaCard({ area, onClick }) {
  const name = area.strArea || area;
  return (
    <button
      onClick={() => onClick(name)}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 bg-white"
    >
      <div className="flex items-center justify-center h-32">
        <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold text-lg">
          {name.charAt(0)}
        </div>
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-gray-800 text-lg font-semibold">{name}</h3>
      </div>
    </button>
  );
}

export default AreaCard;
