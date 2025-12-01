import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.development" });
}

import express from "express";
import cors, { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import { StatusCode } from "./utils/enums";
import movieRoutes from "./routes/movieRoutes";

declare module 'express-session' {
    interface SessionData {
    initialized?: boolean;
  }
}

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://metflix-frontend.onrender.com",
].filter(Boolean);

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["set-cookie"],
};

app.use(
  process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev")
);

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback-secret-very-secure",
    resave: false,
    saveUninitialized: true,
    name: "movieapp.sid",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      domain: process.env.NODE_ENV === "production" ? undefined : undefined,
    },
  })
);

app.use((req, res, next) => {
  if (!req.session.initialized) {
    req.session.initialized = true;
    console.log('✓ Session initialized for:', req.session.id);
  }
  next();
});

app.use("/api/movies", movieRoutes); 

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.use("/api", (_req, res) => {
  res.status(StatusCode.NOT_FOUND).json({
    success: false,
    message: "API route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  console.log(`CORS enabled for: ${allowedOrigins.join(", ")}`);
});