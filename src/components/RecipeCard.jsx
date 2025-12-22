import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

export default function RecipeCard({ recipe, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  // Show confirm modal instead of window.confirm
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirm = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
    onDelete(recipe._id);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow w-[280px]">
      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
            <p className="mb-4 font-semibold">Are you sure you want to delete <span className="text-red-500">{recipe.title}</span>?</p>
            <div className="flex justify-center gap-4">
              <button onClick={handleConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
              <button onClick={handleCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={handleDeleteClick}
        className='absolute top-2 right-2 bg-red-500 text-black p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10'
        title='Delete Recipe'>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
      <Link to={`/recipe/${recipe._id}`}>
        <img
          src={recipe.image || "https://placehold.co/600x400?text=No+Image"}
          alt={recipe.title}
          className="w-full h-40 object-cover rounded-lg"
        />
        <div className="w-full flex flex-col items-center">
          <p className="text-lg font-semibold text-gray-800 text-center line-clamp-2 mt-1">{recipe.title}</p>
          <p className="text-gray-500 text-sm mt-2">
            {recipe.ingredients.length} ingredients • {recipe.cookingTime} mins
          </p>
        </div>
      </Link>
    </div>
  );
}

