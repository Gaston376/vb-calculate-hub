
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CalculatorKeyProps {
  value: string;
  onClick: (value: string) => void;
  type?: "number" | "operator" | "equals" | "function" | "tab";
  className?: string;
  ariaLabel?: string;
}

const CalculatorKey: React.FC<CalculatorKeyProps> = ({
  value,
  onClick,
  type = "number",
  className,
  ariaLabel
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = () => {
    setIsPressed(true);
    onClick(value);
    setTimeout(() => setIsPressed(false), 150);
  };
  
  return (
    <div
      className={cn(
        "calculator-key",
        type === "operator" && "bg-calculator-operator",
        type === "equals" && "bg-calculator-equals text-white hover:bg-calculator-equals-hover",
        type === "function" && "bg-secondary text-foreground/90",
        type === "tab" && "bg-gray-700 text-white hover:bg-gray-600",
        isPressed && "animate-key-press",
        className
      )}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || `${value} key`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className={cn("calculator-key-effect", isPressed && "opacity-30")} />
      {value}
    </div>
  );
};

export default CalculatorKey;
