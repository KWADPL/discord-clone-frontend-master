import React, { PropsWithChildren } from "react";

function Navbar({
  children,
  ...props
}: PropsWithChildren<React.HTMLProps<HTMLDivElement>>): JSX.Element {
  return (
    <div
      className="flex w-full border-b-2 border-gray-800 justify-start items-center"
      {...props}
    >
      {children}
    </div>
  );
}

export default Navbar;
