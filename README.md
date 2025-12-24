# Spoonfull – Recipe Management Frontend

A frontend web application built with React and Vite that consumes a RESTful backend API to allow users to browse, create, and edit recipes.

This project is designed as a pure client application with no business logic or data persistence handled on the frontend.

---

## 🌐 Live Application

Frontend:
🔗 https://your-frontend-url.com

Backend API:
🔗 https://your-backend-api.com/api/v1

---

## 🎯 Project Purpose

This project was built to gain hands-on experience with:
- API-driven frontend architecture
- Client–server communication using REST APIs
- CRUD workflows in a real-world application
- Building scalable frontend structure ready for authentication and authorization

The frontend is fully decoupled from the backend and communicates only via HTTP requests.

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- JavaScript (ES6+)
- React Router DOM
- Axios

### Styling
- Tailwind CSS
- PostCSS
- Autoprefixer

---

## ✨ Features

- View all recipes
- View individual recipe details
- Create new recipes
- Edit existing recipes
- Delete recipes
- Responsive UI for mobile, tablet and desktop.

---

## 🧩 Architecture Overview

- This application acts as a client-only frontend.
- All data operations are performed through REST API calls.
- No database logic exists on the frontend.
- The backend is treated as an independent service.

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

The same codebase can be used across environments by changing this value.

A reference file .env.example is included in the repository.

##🚀 Local Setup
###Prerequisites

- Node.js (v16 or higher)
- npm

###Steps
git clone https://github.com/JibinBiju50/recipe-frontend.git
cd recipe-frontend
npm install
npm run dev


The application will be available at:

http://localhost:5173

## 📂 Project Structure

```
recipe-frontend/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images and static files
│   ├── components/         # Reusable React components
│   ├── pages/              # Page-level React components
│   ├── services/           # API calls and external services
│   ├── styles/             # Global and component styles
│   ├── config.js           # App configuration (API base URL, etc.)
│   ├── App.jsx             # Main app component
│   └── main.jsx            # Entry point
├── .env.example            # Example env file for setup
├── index.html              # HTML template
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Project documentation
```

## 👤 Author

Jibin Biju
GitHub: https://github.com/JibinBiju50


