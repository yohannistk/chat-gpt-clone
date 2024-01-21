import React, { PropsWithChildren } from "react";

const AuthPageLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center items-center pt-5">{children}</div>
  );
};

export default AuthPageLayout;
