import React from 'react'
import { useState } from 'react';

export default function Ingredient({ingredient}) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="flex items-center bg-blue-50 rounded-lg shadow p-3">
      <div className="flex-1">
        <p className="font-semibold text-gray-700">{ingredient.name}</p>
        <p className="text-sm text-gray-500">Amount: {ingredient.amount} {ingredient.unit}</p>
        {ingredient.original && (
          <p className="text-xs text-gray-400">{ingredient.original}</p>
        )}
      </div>
      {ingredient.image && !imgError ? (
        <img
          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
          alt={ingredient.name}
          className="w-12 h-12 object-cover rounded ml-4 border"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-400 rounded ml-4 border text-xs">
          N/A
        </div>
      )}
    </div>
  )
}
