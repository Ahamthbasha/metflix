import { IUserMovieRepo } from "../../repositories/userRepo/interfaces/IUserMovieRepo";
import { InMemoryUserMovieRepo } from "../../repositories/userRepo/userMovieRepo";

import { IUserMovieService } from "../../services/userService/interfaces/IUserMovieService";
import { UserMovieService } from "../../services/userService/userMovieService";

import { IUserMovieController } from "../../controllers/userController/interfaces/IUserMovieController";
import { UserMovieController } from "../../controllers/userController/userMovieController";

const userMovieRepository : IUserMovieRepo = new InMemoryUserMovieRepo();
const userMovieService : IUserMovieService = new UserMovieService(userMovieRepository);
const userMovieController : IUserMovieController = new UserMovieController(userMovieService);


export {
    userMovieController
}