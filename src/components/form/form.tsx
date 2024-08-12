
import React from "react";
import * as S from "./styles";

const Form = ({ children, ...props }:any): JSX.Element => (
  <S.Form {...props}>{children}</S.Form>
);

export const Input = (props: any): JSX.Element => <S.Input {...props} />;

export default Form;
