import { Router } from "express";
import { userAuthController } from "../config/dependencyInjector/userDependencyInjector";
// import authenticateToken from "../middlewares/authenticateToken";
// import { isUser } from "../middlewares/roleAuth";

const router = Router();

router.post("/signup", userAuthController.userSignUp.bind(userAuthController));

router.post(
  "/resendOtp",
  userAuthController.resendOtp.bind(userAuthController)
);

router.post(
  "/createUser",
  userAuthController.createUser.bind(userAuthController)
);

router.post("/login", userAuthController.login.bind(userAuthController));

router.post("/logout", userAuthController.logout.bind(userAuthController));

router.post(
  "/verifyEmail",
  userAuthController.verifyEmail.bind(userAuthController)
);

router.post(
  "/verifyResetOtp",
  userAuthController.verifyResetOtp.bind(userAuthController)
);

router.post(
  "/forgotResendOtp",
  userAuthController.forgotResendOtp.bind(userAuthController)
);

router.post(
  "/resetPassword",
  userAuthController.resetPassword.bind(userAuthController)
);
router.post(
  "/googleLogin",
  userAuthController.doGoogleLogin.bind(userAuthController)
);

export default router;