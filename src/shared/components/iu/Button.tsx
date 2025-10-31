import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className,
}) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-yellow-500 text-white hover:bg-yellow-600",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className || ""}`}
    >
      {children}
    </button>
  );
};
