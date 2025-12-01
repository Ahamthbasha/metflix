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

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

const allowedOrigins: string[] = [
  process.env.FRONTEND_URL ?? "http://localhost:5173"
].filter((url): url is string => Boolean(url));

const corsOptions: CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
  methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
};

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "HIT3",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    name: "movieapp.sid", 
  })
);


app.use((req, _res, next) => {
  console.log(`Session ID: ${req.session.id}`);
  next();
});

// Routes
app.use("/api/movies", movieRoutes);

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
      console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
      console.log(`CORS enabled for: ${allowedOrigins.join(", ")}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();