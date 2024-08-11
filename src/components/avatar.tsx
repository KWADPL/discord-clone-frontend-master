// Avatar.tsx
import React from "react";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, ...props }) => (
  <img
    {...props}
    src={src}
    className="w-10 h-10 rounded-full mx-5"
    alt="Avatar"
  />
);

export default Avatar;
