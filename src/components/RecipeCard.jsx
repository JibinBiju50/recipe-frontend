import React from 'react'
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'

export default function RecipeCard({ recipe,onDelete }) {

  //function to handle delete click
  const handleDeleteClick = (e)=>{
    e.preventDefault();
    e.stopPropagation();

    if(window.confirm(`Are you sure to delete the ${recipe.title} recipe?`)){
      onDelete(recipe._id);
    }
 
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow">
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

