import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import "./App.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />, // HomePage has its own Navbar, NewsletterSection, and Footer
  },
  {
    path: '/recipe/:recipeId',
    element: <Layout><RecipePage /></Layout>,
  },
  {
    path: '/add-recipe',
    element: <Layout><AddRecipePage /></Layout>,
  },
  {
    path: '/edit-recipe/:recipeId',
    element: <Layout><EditRecipePage /></Layout>,
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

