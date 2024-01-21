import React, { PropsWithChildren } from "react";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex">
      <aside className="w-48 bg-gray-800 text-white p-4 fixed h-full">
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul>
          <li>
            <a href="#" className="text-blue-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-300">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-300">
              Contact
            </a>
          </li>
        </ul>
      </aside>

      <div className="flex-1 p-4 ml-48">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p>This is the main content area. Add your content here.</p>
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
