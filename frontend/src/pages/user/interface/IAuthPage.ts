import type { Login } from "../../../types/interface/IAuth";

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormValues extends Login {

}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface OTPVerificationResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordValues {
  newPassword: string;
  confirmPassword: string;
}
