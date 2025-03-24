
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
    <div className={cn("calculator-display", className)}>
      {expression && (
        <div className="text-sm text-muted-foreground font-light mb-1 animate-fade-in overflow-x-auto whitespace-nowrap">
          {expression}
        </div>
      )}
      <div className="text-3xl font-light overflow-x-auto whitespace-nowrap animate-slide-up">
        {value}
      </div>
    </div>
  );
};

export default CalculatorDisplay;
