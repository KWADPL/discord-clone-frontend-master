import { ClassNames } from "@emotion/react";
import React from "react";

interface IconProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
}

function Icon({ src, alt = "", className = "" }: IconProps): JSX.Element {
  return (
    <img
      className={`w-4 h-4 ml-1 mr-2 cursor-pointer filter-invert-46 sepia-14 saturate-182 hue-rotate-180 brightness-97 contrast-90 ${className}`}
    />
  );
}
export default Icon;
