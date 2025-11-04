import React from "react";

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
  label?: string;
  required?: boolean;
  error?: string; 
};

export const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  name,
  label,
  required,
  error, 
}) => {
  const inputClasses = `
    border rounded-md px-3 py-2 w-full
    focus:outline-none focus:ring-2
    ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'}
    ${className || ""}
  `;

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1">
          {label}{required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={inputClasses}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
