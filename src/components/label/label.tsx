import React, { PropsWithChildren } from "react";

import {P} from "./styles";

export default function Label({
  children,
  ...props
}: PropsWithChildren<any>): JSX.Element {
  return <P {...props}>{children}</P>;
}
