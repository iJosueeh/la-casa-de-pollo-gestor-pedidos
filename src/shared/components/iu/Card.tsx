import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`rounded-lg shadow-md border border-gray-200 bg-white ${className || ""}`}
    >
      {children}
    </div>
  );
};
