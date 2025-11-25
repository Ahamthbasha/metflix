import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {type FormikHelpers } from "formik";

import PasswordField from "../../../components/common/PasswordField";
import { resetPassword } from "../../../api/auth/userAuth";
import type { ResetPasswordValues } from "../interface/IAuthPage";

const resetPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: ResetPasswordValues,
    { setSubmitting }: FormikHelpers<ResetPasswordValues>
  ) => {
    try {
      const response = await resetPassword(values.newPassword);

      if (response.success) {
        toast.success(response.message || "Password reset successfully!");
        localStorage.removeItem("ForgotPassEmail");
        localStorage.removeItem("verificationToken");

        setTimeout(() => {
          navigate("/user/login");
        }, 1500);
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 backdrop-blur-xl rounded-lg p-10 md:p-14 border border-gray-800 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold text-red-600 tracking-tighter">METFLIX</h1>
            <p className="text-gray-400 mt-4 text-lg">Set a new password</p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
          <p className="text-gray-400 text-center text-sm leading-relaxed mb-10">
            Choose a strong password to secure your account.
          </p>

          <Formik<ResetPasswordValues>
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={resetPasswordSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="space-y-8" noValidate>
                {/* New Password */}
                <Field
                  as={PasswordField}
                  name="newPassword"
                  placeholder="New Password"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                />

                {/* Confirm Password */}
                <Field
                  as={PasswordField}
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105 duration-200 shadow-lg"
                >
                  {isSubmitting ? "Updating Password..." : "Set New Password"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Back to Login */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate("/user/login")}
              className="text-gray-400 hover:text-white text-sm underline transition"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;