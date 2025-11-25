import { IUser } from "../../models/userModel";
import IUserAuthService from "./interfaces/IUserAuthService";
import { IUserAuthRepository } from "../../repositories/userRepo/interfaces/IUserAuthRepo";
import { Types } from "mongoose";

export class UserAuthServices implements IUserAuthService {
  private _userAuthRepository: IUserAuthRepository;

  constructor(userAuthRepository: IUserAuthRepository) {
    this._userAuthRepository = userAuthRepository;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this._userAuthRepository.findByEmail(email);
  }

  async findById(userId: string | Types.ObjectId): Promise<IUser | null> {
  return await this._userAuthRepository.findById(userId);
}


  async createUser(userData: IUser): Promise<IUser | null> {
    return await this._userAuthRepository.create(userData);
  }

  async resetPassword(email: string, password: string): Promise<IUser | null> {
    return await this._userAuthRepository.resetPasswrod(email, password);
  }

  async googleLogin(name: string, email: string): Promise<IUser | null> {
    return await this._userAuthRepository.googleLogin(name, email);
  }
}
