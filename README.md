# Spoonfull – Recipe Management Frontend

A frontend web application built with React and Vite that consumes a RESTful backend API to allow users to browse, create, and edit recipes.

This project is designed as a pure client application with no business logic or data persistence handled on the frontend.

---

## 🌐 Live Application

Frontend:  
🔗 https://spoonfullrecipes.netlify.app/

Backend API:  
🔗 https://recipe-backend-xdi5.onrender.com/api/v1/recipes

---

## Features

- List recipes
- View recipe details
- Create, update, and delete recipes
- Title-based recipe search via query parameter

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript (ES6+)
- React Router DOM

### Styling
- Tailwind CSS
- PostCSS
- Autoprefixer

---

## 🔌 API Integration

All API requests are made using a single base URL configured via environment variables.

### API Routes Used
- `GET /api/v1/recipes`
- `GET /api/v1/recipes/:id`
- `POST /api/v1/recipes`
- `PUT /api/v1/recipes/:id`
- `DELETE /api/v1/recipes/:id`

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=https://your-backend-api.com/api/v1
```
Base URL example:

- `http://localhost:5000/api/v1`

A reference file .env.example is included in the repository.

## 🚀 Local Setup

### Prerequisites

- Node.js (v16 or higher)
- npm

### Steps

```bash
git clone https://github.com/JibinBiju50/recipe-frontend.git
cd recipe-frontend
npm install
npm run dev
```

## 👤 Author

Jibin Biju  
GitHub: https://github.com/JibinBiju50
