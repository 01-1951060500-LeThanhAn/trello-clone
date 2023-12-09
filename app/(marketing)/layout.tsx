import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const MainLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="h-full bg-slate-100">
        <Navbar />
        <main className="pt-40 bg-slate-100">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayOut;
