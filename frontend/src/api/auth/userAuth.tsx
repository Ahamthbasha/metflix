import { API } from "../../service/axios";
import userAuthenticationRoutes from "../../types/endpoints/userEndpoint";
import type { userData,Login } from "../../types/interface/IAuth";

export const signup = async (userData: userData)=> {
  try {
    const response = await API.post(
      userAuthenticationRoutes.userAuthenticationRoutes.userSignUp,
      userData
    );
    return response.data;
  } catch (error) {
    throw error
  }
};

export const resendOtp = async (email: string)=> {
  try {
    const response = await API.post(userAuthenticationRoutes.userAuthenticationRoutes.userResendOtp, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (otp: string)=> {
  try {
    const response = await API.post(userAuthenticationRoutes.userAuthenticationRoutes.userVerifyOtp, {
      otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password, role }: Login)=> {
  try {
    const response = await API.post(userAuthenticationRoutes.userAuthenticationRoutes.userLogin, {
      email,
      password,
      role,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async ()=> {
  try {
    const response = await API.post(
      userAuthenticationRoutes.userAuthenticationRoutes.userLogout,
      {}
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (email: string) => {
  try {
    const response = await API.post(userAuthenticationRoutes.userAuthenticationRoutes.userVerifyEmail, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyResetOtp = async (email: string, otp: string) => {
  try {
    const response = await API.post(
      userAuthenticationRoutes.userAuthenticationRoutes.userVerifyResetOtp,
      { email, otp },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotResendOtp = async (email: string)=> {
  try {
    const response = await API.post(
      userAuthenticationRoutes.userAuthenticationRoutes.userForgotResendOtp,
      { email }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (password: string) => {
  try {
    const response = await API.post(
      userAuthenticationRoutes.userAuthenticationRoutes.userResetPassword,
      { password },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleLogin = async (loginData: object) => {
  try {
    const response = await API.post(
      userAuthenticationRoutes.userAuthenticationRoutes.userGoogleLogin,
      loginData,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
