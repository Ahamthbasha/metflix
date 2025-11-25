import { forwardRef } from "react";
import type { InputFieldProps } from "./interface/ICommoninteface"; 

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, className = "", containerClassName = "", ...props }, ref) => {
    return (
      <div className={`w-full ${containerClassName}`.trim()}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition
            ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500"}
            ${className}
          `.trim().replace(/\s+/g, " ")}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";
export default InputField;