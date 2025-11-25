import { IJwtService } from "../../services/common/interface/IJwtService";
import { JwtService } from "../../services/common/jwtService";
import { IEmail } from "../../types/IEmail";
import { SendEmail } from "../../utils/sendOtpEmail";
import { IOtpGenerate } from "../../types/IOtpGenerate";
import { OtpGenerate } from "../../utils/otpGenerator";
import IOtpServices from "../../services/common/interface/IOtpService";
import RedisOtpService from "../../services/common/otpService";

import { IUserAuthRepository } from "../../repositories/userRepo/interfaces/IUserAuthRepo";
import { UserAuthRepository } from "../../repositories/userRepo/userAuthRepo";

import IUserAuthService from "../../services/userService/interfaces/IUserAuthService";
import { UserAuthServices } from "../../services/userService/userAuthService";

import IUserAuthController from "../../controllers/userController/interfaces/IUserAuthController";
import { UserAuthController } from "../../controllers/userController/userAuthController";

const otpService : IOtpServices = new RedisOtpService()
const otpGenerator : IOtpGenerate = new OtpGenerate()
const jwtService : IJwtService = new JwtService()
const emailService : IEmail = new SendEmail()

const userAuthRepository : IUserAuthRepository = new UserAuthRepository();
const userAuthService : IUserAuthService = new UserAuthServices(userAuthRepository)
const userAuthController : IUserAuthController = new UserAuthController(userAuthService,otpService,otpGenerator,jwtService,emailService)


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
    userAuthController,
    userMovieController
}