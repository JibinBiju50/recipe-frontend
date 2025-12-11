import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import './index.css'

import HomePage from './pages/HomePage.jsx'
import RecipePage from './pages/RecipePage.jsx'
import AddRecipePage from './pages/AddRecipePage.jsx'
import EditRecipePage from './pages/EditRecipePage.jsx'


const router = createBrowserRouter ([
  {
    path:'/',
    element: <HomePage />
  },
  {
    path:'/recipe/:recipeId',
    element: <RecipePage />
  },
  {
    path:'/add-recipe',
    element: <AddRecipePage />
  },
  {
    path:'/edit-recipe/:recipeId',
    element: <EditRecipePage />
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    <RouterProvider router={router} />
  </StrictMode>,
)
