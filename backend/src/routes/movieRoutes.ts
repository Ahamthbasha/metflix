import { Router } from "express";
import { userMovieController } from "../config/dependencyInjector/userDependencyInjector";
import { extractUserId } from "../middlewares/userIdExtractor";

const router = Router();

router.use(extractUserId)

router.get("/search", userMovieController.searchMovies.bind(userMovieController));
router.get("/popular", userMovieController.getPopularMovies.bind(userMovieController));
router.get("/favourites", userMovieController.getFavourites.bind(userMovieController));
router.post("/toggleFavourite", userMovieController.toggleFavorite.bind(userMovieController));

export default router;