import React, { PropsWithChildren } from "react";
import * as S from "./styles";

export default function Navbar({
  children,
  ...props
}: PropsWithChildren<{}>): JSX.Element {
  return <S.Navbar {...props}>{children}</S.Navbar>;
}
