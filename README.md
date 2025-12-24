# 🍳 Spoonfull - Recipe Management Application

A modern, full-featured recipe management web application built with React and Vite.  Discover, create, edit, and update delicious recipes with an intuitive and responsive user interface.

## 🌐 Live Application

Frontend:
🔗 [https://spoonfullrecipes.netlify.app/]

Backend API:
🔗 [https://recipe-backend-xdi5.onrender.com/api/recipes]

## ✨ Features

- View all recipes
- View individual recipe details
- Create new recipes
- Edit existing recipes
- Upload recipe images (via backend integration)
- Fully Responsive Ui

## 🛠️ Tech Stack

### Frontend
- **React**
- **Vite** 
- **React Router DOM**

### Styling
- **Tailwind CSS** (4.1.15)
- **PostCSS**
- **Autoprefixer**

## Architecture Overview
- This application acts as a pure client.
- All business logic and data persistence are handled by the backend.
- The frontend communicates with the backend via a RESTful API.
- No database logic exists on the frontend.

## 🔌 API Integration

This frontend connects to a backend API.  Make sure to configure the `API_BASE` URL in `src/config.js`:

### API Endpoints Expected
- `GET /api/recipes` - Fetch all recipes
- `GET /api/recipes/:id` - Fetch single recipe
- `POST /api/recipes` - Create new recipe
- `PUT /api/recipes/:id` - Update recipe
- `DELETE /api/recipes/:id` - Delete recipe
- `POST /api/upload` - Upload image to Cloudinary

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/JibinBiju50/recipe-frontend. git
   cd recipe-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `src/config.js` file with your API configuration:
   ```javascript
   export const API_BASE = 'your-api-base-url';
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 📂 Project Structure

```
recipe-frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, logos, and media files
│   ├── components/     # Reusable React components
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── NewsletterSection.jsx
│   │   ├── RecipeCard.jsx
│   │   └── SearchBar.jsx
│   ├── pages/          # Page components
│   │   ├── HomePage.jsx
│   │   ├── RecipePage.jsx
│   │   ├── AddRecipePage.jsx
│   │   └── EditRecipePage.jsx
│   ├── service/        # API service functions
│   │   └── recipeAPI.js
│   ├── App.jsx         # Main app component with routing
│   ├── App.css         # App-specific styles
│   ├── index.css       # Global styles
│   ├── main.jsx        # Application entry point
│   └── config.js       # Configuration file
├── index.html          # HTML template
├── vite.config.js      # Vite configuration
├── eslint.config.js    # ESLint configuration
├── package.json        # Dependencies and scripts
└── README.md          # Project documentation
```

## 👤 Author

**JibinBiju50**
- GitHub: [@JibinBiju50](https://github.com/JibinBiju50)

---

Made with ❤️ and ☕ by [JibinBiju50](https://github.com/JibinBiju50)
