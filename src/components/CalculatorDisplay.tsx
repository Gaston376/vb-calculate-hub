
import React from "react";
import { cn } from "@/lib/utils";

interface CalculatorDisplayProps {
  value: string;
  expression: string;
  className?: string;
}

const CalculatorDisplay: React.FC<CalculatorDisplayProps> = ({ 
  value, 
  expression, 
  className 
}) => {
  return (
    <div className={cn("calculator-display bg-gradient-to-r from-gray-100 to-gray-50", className)}>
      {expression && (
        <div className="text-sm text-gray-600 font-medium mb-1 animate-fade-in overflow-x-auto whitespace-nowrap">
          {expression}
        </div>
      )}
      <div className="text-3xl font-semibold text-gray-800 overflow-x-auto whitespace-nowrap animate-slide-up">
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
