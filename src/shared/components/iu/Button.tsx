import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "info";
  className?: string;
  gradient?: boolean; 
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className,
  gradient = false, 
}) => {
  const baseStyle =
    "px-3 py-1.5 text-sm rounded-md font-medium transition-all duration-300 ease-in-out sm:px-4 sm:py-2 sm:text-base";

  const gradientStyles = "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg";

  const variants = {
    primary: "bg-yellow-500 text-white hover:bg-yellow-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    info: "bg-blue-600 text-white hover:bg-blue-700", 
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${gradient ? gradientStyles : variants[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
};
