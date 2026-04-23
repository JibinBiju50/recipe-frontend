# Spoonfull Frontend

Spoonfull is the React frontend for a full-stack recipe sharing application. It lets users browse recipes, search by title, view recipe details, register and log in, and manage recipes they created.

This app is built with React and Vite, uses React Router for navigation, and communicates with the backend through a REST API.

## Live App

- Frontend: [https://spoonfullrecipes.netlify.app/](https://spoonfullrecipes.netlify.app/)
- Backend API: [https://recipe-backend-xdi5.onrender.com](https://recipe-backend-xdi5.onrender.com)

## Features

- Browse recipes with pagination
- Search recipes by title
- View recipe details
- Register and log in users
- Show current authentication state in the UI
- Add new recipes with image upload
- Edit recipes created by the logged-in user
- Delete recipes from the profile page
- Redirect unauthenticated users from protected pages
- Refresh expired access tokens with cookie-based auth flow
- Responsive layout built with Tailwind CSS

## Tech Stack

- React 19
- Vite
- React Router DOM
- Tailwind CSS
- ESLint
- React Hot Toast
- Font Awesome / React Icons

## Project Structure

```text
src/
  components/    Shared UI pieces such as Navbar, Footer, cards, and search
  pages/         Route-level pages
  service/       API helpers for auth and recipe requests
  assets/        Static images
  config.js      Frontend API base configuration
```

## API Usage

The frontend appends API paths internally, so the environment variable should point to the backend root URL only.

Examples of routes used by the frontend:

- `GET /api/v1/recipes`
- `GET /api/v1/recipes/:id`
- `POST /api/v1/recipes`
- `PATCH /api/v1/recipes/:id`
- `DELETE /api/v1/recipes/:id`
- `GET /api/v1/recipes/user/profile`
- `POST /api/v1/recipes/upload`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/auth/me`

## Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_API_BASE=http://localhost:3000
```

Important:

- Use the backend root URL only
- Do not include `/api/v1` in `VITE_API_BASE`

Examples:

- Local: `VITE_API_BASE=http://localhost:3000`
- Production: `VITE_API_BASE=https://your-backend.onrender.com`

A sample file is included at [`.env.example`](./.env.example).

## Local Development

### Prerequisites

- Node.js 18+
- npm
- Running Spoonfull backend

### Install and Run

```bash
npm install
npm run dev
```

The Vite dev server usually runs on:

- `http://localhost:5173`

## Available Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - create a production build
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Authentication Notes

- Authentication uses HTTP-only cookies issued by the backend
- Protected frontend actions rely on `credentials: 'include'`
- Expired access tokens are retried through the refresh endpoint
- The edit page checks both login state and recipe ownership before allowing edits

## Deployment Notes

For Netlify:

- Set `VITE_API_BASE` to your backend Render URL
- Example: `https://your-backend.onrender.com`


## Author

Jibin Biju  
GitHub: [https://github.com/JibinBiju50](https://github.com/JibinBiju50)
