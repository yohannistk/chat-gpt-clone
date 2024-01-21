import Sidebar from "@/components/Sidebar";
import React, { PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar />
      <main className="h-full flex-1">{children}</main>
    </div>
  );
};

export default DashboardLayout;
