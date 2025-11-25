import { Router } from "express";
import { userMovieController } from "../config/dependencyInjector/userDependencyInjector";

const router = Router();

router.get("/search",userMovieController.searchMovies.bind(userMovieController));
router.get("/favourites",userMovieController.getFavourites.bind(userMovieController));
router.post("/toggleFavourite",userMovieController.toggleFavorite.bind(userMovieController));

export default router