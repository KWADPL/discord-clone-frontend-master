// Button.tsx
import React, { PropsWithChildren } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => (
  <button
    className="
      px-4 py-2
      text-sm font-semibold
      rounded-lg
      border-none
      bg-green-500
      text-white
      cursor-pointer
      outline-none
      text-center
      transition
      duration-300
      ease-in-out
      hover:bg-green-600
      focus:ring-2
      focus:ring-green-300
      focus:ring-opacity-50
      active:bg-green-700
    "
    {...props}
  >
    {children}
  </button>
);

export default Button;
