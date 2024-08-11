import React, { PropsWithChildren } from "react";

interface LabelProps {
  className?: string;
  [key: string]: any;
}

function Label({
  children,
  className = "",
  ...props
}: PropsWithChildren<LabelProps>): JSX.Element {
  return (
    <p
      className={`text-gray-600 font-bold text-sm text-center inline-block ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}

export default Label;
