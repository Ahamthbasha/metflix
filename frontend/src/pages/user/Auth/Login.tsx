import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import InputField from "../../../components/common/InputField";
import PasswordField from "../../../components/common/PasswordField";
import { setUser } from "../../../redux/slices/userSlice";
import { login, googleLogin } from "../../../api/auth/userAuth";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import type { DecodedGoogleCredential } from "../../../types/interface/IAuth";
import type { ApiError } from "../interface/IApiError";
import type { LoginFormValues } from "../interface/IAuthPage";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password too short")
    .matches(/[A-Z]/, "Must contain uppercase letter")
    .matches(/[a-z]/, "Must contain lowercase letter")
    .matches(/\d/, "Must contain a number"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
    role: "user",
  };

  const handleLogin = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const response = await login({
        email: values.email.trim(),
        password: values.password,
        role: values.role,
      });

      if (response.success && response.user) {
        const user = response.user;

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
        }

        dispatch(
          setUser({
            _id: user._id,
            username: user.username || user.name || "User",
            email: user.email,
            role: user.role || "user",
            isBlocked: user.isBlocked ?? false
          })
        );

        toast.success("Welcome back to Metflix!");
        navigate("/");
      } else {
        toast.error(response.message || "Invalid email or password");
      }
    } catch (error) {
      const err = error as ApiError;
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      if (!credentialResponse.credential) {
        toast.error("Google authentication failed");
        return;
      }

      const decoded: DecodedGoogleCredential = jwtDecode(
        credentialResponse.credential
      );

      const response = await googleLogin({
        name: decoded.name,
        email: decoded.email,
        profilePicture: decoded.picture,
        role: "user",
      });

      if (response.success && response.user) {
        const user = response.user;

        localStorage.setItem("user", JSON.stringify(user));
        if (response.accessToken) {
          localStorage.setItem("accessToken", response.accessToken);
        }

        dispatch(
          setUser({
            _id: user._id,
            username: user.name || decoded.name,
            email: user.email,
            role: user.role || "user",
            isBlocked: user.isBlocked ?? false,
          })
        );

        toast.success("Signed in with Google!");
        navigate("/");
      } else {
        toast.error(response.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 backdrop-blur-xl rounded-lg p-10 md:p-14 border border-gray-800 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold text-red-600 tracking-tighter">
              METFLIX
            </h1>
            <p className="text-gray-400 mt-2 text-lg">
              Sign in to continue watching
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-8">Sign In</h2>

          <Formik<LoginFormValues>
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="space-y-6" noValidate>
                {/* Email */}
                <Field
                  as={InputField}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />

                {/* Password */}
                <Field
                  as={PasswordField}
                  name="password"
                  placeholder="Password"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />

                {/* Forgot Password */}
                <div className="text-right">
                  <Link
                    to="/user/verifyEmail"
                    className="text-sm text-gray-400 hover:text-white underline transition"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105 duration-200 shadow-lg"
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-700" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <div className="flex-1 border-t border-gray-700" />
          </div>

          {/* Google Login */}
          <div className="flex justify-center -mt-2">
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID ?? ""}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => toast.error("Google Sign-In failed")}
                size="large"
                theme="filled_black"
                text="continue_with"
                shape="rectangular"
                width="340"
              />
            </GoogleOAuthProvider>
          </div>

          {/* Sign Up Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-400">
              New to Metflix?{" "}
              <Link
                to="/signup"
                className="text-white font-bold hover:underline text-lg"
              >
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;