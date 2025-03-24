
import React from "react";
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-3xl font-light mb-2 tracking-tight">Modern Calculator</h1>
        <p className="text-muted-foreground max-w-md">
          A beautifully designed calculator with advanced mathematical functions.
        </p>
      </div>
      
      <Calculator />
      
      <div className="mt-12 text-sm text-muted-foreground animate-fade-in">
        <p className="mb-2">Keyboard shortcuts are supported. Try using your number keys and operators.</p>
        <p className="font-medium">Developed by GSS-TEC</p>
      </div>
    </div>
  );
};

export default Index;
