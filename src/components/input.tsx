import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps): JSX.Element {
  return <input
    {...props}
    className="w-full h-9 rounded-sm border border-transparent hover:border-black"
  />
}
