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
import { StatusCode } from "./utils/enums"; 
import movieRoutes from "./routes/movieRoutes";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

const allowedOrigins: string[] = [process.env.FRONTEND_URL ?? "https://ulearnfrontend.onrender.com"].filter(
  (url): url is string => Boolean(url),
);

const corsOptions: CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
};

// HTTP request logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// Middleware
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/movies",movieRoutes)

// 404 handler
app.use("/api", (_req, res) => {
  res.status(StatusCode.NOT_FOUND).json({
    success: false,
    message: "API route not found",
  });
});


const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();