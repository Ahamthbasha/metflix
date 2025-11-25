import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { PasswordFieldProps } from "./interface/ICommoninteface"; 

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, className = "", containerClassName = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className={`w-full ${containerClassName}`.trim()}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={`
              w-full px-4 py-2 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
              ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500"}
              ${className}
            `.trim().replace(/\s+/g, " ")}
            {...props}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";
export default PasswordField;