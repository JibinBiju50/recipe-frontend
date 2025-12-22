import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import "./App.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/recipe/:recipeId',
    element: <RecipePage />,
  },
  {
    path: '/add-recipe',
    element: <AddRecipePage />,
  },
  {
    path: '/edit-recipe/:recipeId',
    element: <EditRecipePage />,
  },
]);

export default function App() {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </>
  );
}

