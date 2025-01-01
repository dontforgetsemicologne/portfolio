import React from "react";

export default function MainLayout({ 
    children 
}: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen min-h-full md:min-h-[35rem] min-w-[400px] overflow-x-hidden">
      {children}
    </div>
  );
};

