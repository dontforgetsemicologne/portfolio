import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import React from "react";

export default function MainLayout({ 
    children 
}: { children: React.ReactNode }) {
  return (
    <>
      <Preloader/>
      <div className="relative h-screen min-h-full md:min-h-[35rem] min-w-[400px] overflow-x-hidden">
        <Navbar/>
        {children}
      </div>
    </>
  );
};

