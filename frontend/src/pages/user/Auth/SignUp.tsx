import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../../components/common/InputField";
import PasswordField from "../../../components/common/PasswordField";
import { signup } from "../../../api/auth/userAuth";
import { AxiosError } from "axios";
import {type SignUpFormValues } from "../interface/IAuthPage";

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{3,20}$/,
      "Username must be 3–20 chars, contain letters, allow numbers/underscores"
    )
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/\d/, "Must contain a number")
    .matches(/[@$!%*?&]/, "Must contain a special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const handleRegister = async (
    values: SignUpFormValues,
    { setSubmitting }: FormikHelpers<SignUpFormValues>
  ) => {
    try {
      const response = await signup({
        username: values.username.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      if (response.success) {
        localStorage.setItem("verificationToken", response.token);
        localStorage.setItem("email", values.email);
        toast.success(response.message || "Check your email for OTP!");
        navigate("/user/verifyOtp");
      } else {
        toast.error(response.message || "Signup failed");
      }
    } catch (error) {
      const msg =
        error instanceof AxiosError
          ? error.response?.data?.message || "Something went wrong"
          : "Network error. Please try again.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-black to-black" />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 backdrop-blur-xl rounded-lg p-8 md:p-12 border border-gray-800 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold text-red-600 tracking-tighter">METFLIX</h1>
            <p className="text-gray-400 mt-3 text-lg">Unlimited movies, TV shows, and more</p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

          <Formik<SignUpFormValues>
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={signupSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="space-y-6" noValidate>
                {/* Username */}
                <Field
                  as={InputField}
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.username && errors.username ? errors.username : undefined}
                />

                {/* Email */}
                <Field
                  as={InputField}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.email && errors.email ? errors.email : undefined}
                />

                {/* Password */}
                <Field
                  as={PasswordField}
                  name="password"
                  placeholder="Create a strong password"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.password && errors.password ? errors.password : undefined}
                />

                {/* Confirm Password */}
                <Field
                  as={PasswordField}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105 duration-200 shadow-lg disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating Account..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Sign In Link */}
          <div className="mt-10 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                to="/user/login"
                className="text-white font-bold hover:underline text-lg"
              >
                Log In Now
              </Link>
            </p>
          </div>

          {/* Legal Text */}
          <p className="text-xs text-gray-500 text-center mt-10 leading-relaxed">
            This page is protected by reCAPTCHA and the Google{" "}
            <a href="#" className="underline hover:text-white">Privacy Policy</a> and{" "}
            <a href="#" className="underline hover:text-white">Terms of Service</a> apply.
          </p>
        </div>
      </div>
   36
    </div>
  );
};

export default SignUp;