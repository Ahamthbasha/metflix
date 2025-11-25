import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmail, verifyResetOtp } from "../../../api/auth/userAuth";

const ResetVerificationOTP = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [counter, setCounter] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const navigate = useNavigate();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendActive(true);
    }
  }, [counter]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pasted)) {
      setOtp(pasted.split(""));
      inputRefs.current[3]?.focus();
    }
  };

  const handleResend = async () => {
    const email = localStorage.getItem("ForgotPassEmail");
    if (!email) {
      toast.error("Session expired. Please try again.");
      navigate("/user/forgot-password");
      return;
    }
    try {
      const response = await verifyEmail(email);
      if (response.success) {
        toast.success("New code sent!");
        setCounter(60);
        setIsResendActive(false);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(response.message || "Failed to resend");
      }
    } catch {
      toast.error("Network error. Try again.");
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 4) {
      toast.error("Please enter all 4 digits");
      return;
    }
    const email = localStorage.getItem("ForgotPassEmail");
    if (!email) {
      toast.error("Session expired");
      navigate("/user/forgot-password");
      return;
    }
    try {
      const response = await verifyResetOtp(email, code);
      if (response.success) {
        toast.success("OTP verified! Redirecting...");
        setTimeout(() => {
          navigate("/user/resetPassword");
        }, 1000);
      } else {
        toast.error(response.message || "Invalid OTP");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-black to-black" />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 backdrop-blur-xl rounded-lg p-10 md:p-14 border border-gray-800 shadow-2xl text-center">
          {/* Logo */}
          <div className="mb-10">
            <h1 className="text-6xl font-bold text-red-600 tracking-tighter">METFLIX</h1>
            <p className="text-gray-400 mt-4 text-lg">Verify Your Identity</p>
          </div>

          <h2 className="text-3xl font-bold mb-4">Enter Security Code</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            We've sent a 4-digit code to your email.
            <br />
            Enter it below to continue.
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-3 mb-10">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-14 h-14 bg-gray-800/70 border border-gray-700 text-white text-2xl font-bold text-center rounded-lg focus:outline-none focus:ring-4 focus:ring-red-600 focus:border-red-600 transition-all"
                inputMode="numeric"
                autoComplete="one-time-code"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-lg transition transform hover:scale-105 duration-200 shadow-lg mb-6"
          >
            Verify & Continue
          </button>

          {/* Resend */}
          <div className="text-sm">
            {isResendActive ? (
              <button
                onClick={handleResend}
                className="text-red-500 hover:text-red-400 font-medium underline"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-400">
                Didn't receive it? Resend in{" "}
                <span className="text-red-500 font-bold">{counter}s</span>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ResetVerificationOTP;