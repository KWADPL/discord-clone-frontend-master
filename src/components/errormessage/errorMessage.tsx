import React from "react";

import { Message } from "./styles";

export default function ErrorMessage({ message, ...props }:any): JSX.Element {
  return <Message {...props}>{message}</Message>;
}
