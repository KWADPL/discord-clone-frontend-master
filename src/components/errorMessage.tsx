import React from "react";

interface ErrorMessageProps extends React.HTMLProps<HTMLSpanElement> {
  message: string;
}

export default function ErrorMessage({
  message,
  ...props
}: ErrorMessageProps): JSX.Element {
  return (
    <span
      {...props}
      className="text-red-500 text-xs absolute px-2 left-1/2 transform -translate-x-1/2"
    >
      {message}
    </span>
  );
}
