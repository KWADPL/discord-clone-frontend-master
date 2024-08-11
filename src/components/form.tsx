import React from "react";

function Form({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLFormElement>): JSX.Element {
  return <form className={`p-4 ${className}`} {...props}>
    {children}
  </form>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>): JSX.Element {
  return <input
    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
}

export default Form;
