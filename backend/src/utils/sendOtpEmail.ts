import { IEmail } from "../types/IEmail";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

export class SendEmail implements IEmail {
  constructor() {
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    if (!sendgridApiKey) {
      throw new Error("SENDGRID_API_KEY is not set in environment variables");
    }
    sgMail.setApiKey(sendgridApiKey);
    console.log('✅ Email service initialized with SendGrid HTTP API');
  }

  async sentEmailVerification(
    name: string,
    email: string,
    verificationCode: string,
  ): Promise<any> {
    const senderEmail = process.env.SENDER_EMAIL;

    if (!senderEmail) {
      throw new Error("SENDER_EMAIL is not set in environment variables");
    }

    const msg = {
      to: email,
      from: senderEmail,
      subject: "🌟 Welcome to Metflix - Verify Your Email 🌟",
      text: `Hello ${name},\n\nYour verification code is: ${verificationCode}\n\nThanks,\nThe ulearn Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; text-align: center; border-radius: 8px; background-color: #f7f7f7;">
          <div style="background-color: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 8px; display: inline-block; width: 80%; max-width: 600px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; margin-bottom: 10px;">Welcome to Metflix, ${name}!</h2>
            <p style="font-size: 1.1em; margin-bottom: 20px;">We're excited to have you onboard. Please use the verification code below to complete your email verification:</p>
            <div style="margin: 20px 0; font-size: 1.5em; font-weight: bold; color: #4CAF50; background: #f0f0f0; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
              ${verificationCode}
            </div>
            <p>If you didn't request this, please ignore this email.</p>
            <br>
            <p>Thank you, ${name}</p>
            <p><strong>The Metflix Team</strong></p>
          </div>
        </div>
      `,
    };

    try {
      const response = await sgMail.send(msg);
      console.log('✅ Email sent successfully via SendGrid API:', response[0].statusCode);
      return response;
    } catch (error) {
      console.error('❌ SendGrid API error:', error);
      throw error;
    }
  }

  
}