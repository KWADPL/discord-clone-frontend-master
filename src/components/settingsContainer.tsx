import React, { PropsWithChildren } from "react";

function SettingsContainer({
  children,
  ...props
}: PropsWithChildren<any>): JSX.Element {
  return (
    <div
      {...props}
      className="fixed bottom-0 w-60 h-16 bg-gray-800 flex items-center justify-between"
    >
      {children}
    </div>
  );
}
export default SettingsContainer;
