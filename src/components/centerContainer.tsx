// CenterContainer.tsx
import React, { PropsWithChildren } from "react";

interface CenterContainerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
}

const CenterContainer: React.FC<PropsWithChildren<CenterContainerProps>> = ({
  children,
  ...props
}) => (
  <div
    className="
      w-[100px]
      h-[40px]
      bg-transparent
      flex
      items-center
      justify-center
      cursor-pointer
      transition
      duration-300
      ease-in-out
      hover:bg-gray-700
      hover:brightness-110
      rounded-md
    "
    {...props}
  >
    {children}
  </div>
);

export default CenterContainer;
