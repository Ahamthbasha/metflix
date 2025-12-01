import dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config();
} else {
  dotenv.config({ path: ".env.development" });
}

import express from "express";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { StatusCode } from "./utils/enums";
import movieRoutes from "./routes/movieRoutes";

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
      console.log(`❌ CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-User-ID"], 
  exposedHeaders: ["X-User-ID"],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(
  process.env.NODE_ENV === "production" ? morgan("combined") : morgan("dev")
);

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});