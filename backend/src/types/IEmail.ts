import { SentMessageInfo } from "nodemailer";

export interface IEmail {
  sentEmailVerification(
    name: string,
    email: string,
    verification: string,
  ): Promise<SentMessageInfo>;
}

export interface IForgotEmail {
  sendEmailVerification(email: string, verification: string): Promise<boolean>;
}
