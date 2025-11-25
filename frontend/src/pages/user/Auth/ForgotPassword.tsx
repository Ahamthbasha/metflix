import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../../../components/common/InputField";
import { verifyEmail } from "../../../api/auth/userAuth";
import type { ForgotPasswordFormValues } from "../interface/IAuthPage";

const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormValues>
  ) => {
    try {
      const response = await verifyEmail(values.email.trim());

      if (response?.success) {
        localStorage.setItem("ForgotPassEmail", response.data.email);
        toast.success(response.message || "Check your email for the reset code!");
        navigate("/user/forgotPasswordOtp");
      } else {
        toast.error(response?.message || "Email not found. Please check and try again.");
      }
    } catch (error) {
      toast.error("something went wrong. Please try again later.");
      console.error("Forgot password error:", error);
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
            <p className="text-gray-400 mt-3 text-lg">Reset your password</p>
          </div>

          <h2 className="text-3xl font-bold mb-8">Forgot Password?</h2>
          <p className="text-gray-400 text-center mb-10 leading-relaxed">
            Enter the email address associated with your Metflix account.
            We'll send you a code to reset your password.
          </p>

          <Formik<ForgotPasswordFormValues>
            initialValues={{ email: "" }}
            validationSchema={emailSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form className="space-y-8" noValidate>
                {/* Email Field */}
                <Field
                  as={InputField}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="bg-gray-800/60 border-gray-700 text-white placeholder-gray-500 focus:ring-red-600 focus:border-red-600 text-lg py-4 rounded-lg"
                  error={touched.email && errors.email ? errors.email : undefined}
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105 duration-200 shadow-lg"
                >
                  {isSubmitting ? "Sending Code..." : "Continue"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Back to Login */}
          <div className="mt-10 text-center">
            <Link
              to="/user/login"
              className="text-gray-400 hover:text-white underline text-sm transition"
            >
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;