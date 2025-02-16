import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const HomeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
        {/* Header */}
        <Header/>

        {/* Content */}
        <main className="flex-1">
            {children}
        </main>

        {/* Footer */}
        <Footer/>
    </div>
  );
};

export default HomeWrapper;