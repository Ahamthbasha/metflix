🎬 Metflix – Movie Search & Favorites App

A Netflix-inspired full-stack movie browsing application

Metflix is a beautifully designed movie exploration app built using React + Vite (Frontend) and Node.js + Express + TypeScript (Backend).
Search movies and TV shows using the OMDB API, browse trending titles, and save your favorites — all without requiring login.
User favorites are stored per session using a unique auto-generated user ID.

🚀 Live Demo

🔗 Frontend: https://metflix-frontend.onrender.com

🔗 Backend API: Deployed separately

✨ Features

🔍 Search movies & TV shows (OMDB API)

🎬 Popular/Trending Movies section on homepage

❤️ Add / Remove Favorites (session-based)

⭐ My Favorites page

🔄 Real-time favorite sync across all pages

⌛ Debounced search with pagination

📱 Fully responsive UI

🎨 Modern UI with Tailwind CSS & Lucide Icons

🔔 Toast Notifications (react-toastify)

🧹 Clean Architecture with Repository Pattern

🛠 Tech Stack
Layer	Technologies
Frontend	React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Axios, React-Toastify
Backend	Node.js, Express, TypeScript
API	OMDB API (http://www.omdbapi.com)
Architecture	Repository Architecture (Repository → Service → Controller → Routes)
Deployment	Frontend → Render
Backend → Render 
📁 Backend Folder Structure
src/
├── config/              # Dependency injection
├── controllers/
├── middlewares/         # userIdExtractor middleware
├── repositories/        # In-memory favorites repository
├── routes/
├── services/            # Business logic layer
├── utils/
│   ├── omdbClient.ts
│   └── userIdExtractor.ts
└── server.ts

🗂 Favorites Storage (No Database Required)

Favorites are stored using:

Map<string, Set<string>>  // userId → Set of imdbIDs


Perfect for demos, lightweight apps, or portfolio projects.

🧑‍💻 How User Identification Works (No Login Needed)

On first visit, a UUID is generated and saved in SessionStorage as userId.

Every API request includes this value in header:

X-User-ID: <uuid>


Backend middleware (userIdExtractor) attaches this to req.userId.

All favorite operations are scoped to this user only.

🔌 API Endpoints

Base URL: /api/movies

Method	Endpoint	Description	Params / Headers
GET	/search?q=batman&page=1	Search movies	q (required), page (optional)
GET	/popular	Get 8 popular movies	–
GET	/favourites	Get user's favorites	Header: X-User-ID
POST	/toggleFavourite	Add/remove favorite	Header: X-User-ID, Body: { imdbID }

All movie lists include:

isFavorite: true/false

🔧 Backend Environment Variables

Create .env.development or .env:

PORT=3000
NODE_ENV=development or production
OMDB_API_KEY=your_omdb_key_here


Get free OMDB key → https://www.omdbapi.com/apikey.aspx

▶️ Setup & Installation
1️⃣ Clone Repository
git clone https://github.com/yourusername/metflix.git
cd metflix

🖥 Backend Setup
cd backend
npm install
cp .env.example .env.development    # or .env for production
# Add OMDB_API_KEY
npm run dev


Backend runs on:

http://localhost:3000

🎨 Frontend Setup
cd frontend
npm install
cp .env.example .env


Edit .env:

VITE_BASEURL=http://localhost:3000


Run dev server:

npm run dev


Frontend runs on:

http://localhost:5173

☁️ Deployment Guide
1️⃣ Deploy Backend (Render / Railway / Fly.io)

Example backend URL:

https://metflix-backend.onrender.com

2️⃣ Update Frontend .env.production
VITE_BASEURL=https://metflix-backend.onrender.com

3️⃣ Deploy Frontend (Render / Vercel / Netlify)

CORS is pre-configured for:

http://localhost:5173
https://metflix-frontend.onrender.com