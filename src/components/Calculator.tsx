
import React, { useEffect } from "react";
import CalculatorDisplay from "@/components/CalculatorDisplay";
import CalculatorKeypad from "@/components/CalculatorKeypad";
import { cn } from "@/lib/utils";
import { useCalculator } from "@/hooks/useCalculator";
import { setupKeyboardHandler } from "@/utils/calculatorKeyboardHandler";
import { handleCalculatorKey } from "@/utils/calculatorKeyHandler";

interface CalculatorProps {
  className?: string;
}

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const { state, actions } = useCalculator();

  const handleKeyPress = (key: string) => {
    handleCalculatorKey(key, actions);
  };

  useEffect(() => {
    const keyboardHandler = setupKeyboardHandler(state, actions);
    window.addEventListener("keydown", keyboardHandler);
    
    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [state, actions]);

  return (
    <div 
      className={cn(
        "w-full max-w-xs md:max-w-sm rounded-2xl overflow-hidden shadow-calculator backdrop-blur-sm transition-all duration-300",
        "animate-scale-in border border-gray-200",
        className
      )}
    >
      <div className="bg-calculator-header p-2 text-center text-md text-white font-medium">
        GSS-TEC Advanced Calculator
      </div>
      <CalculatorDisplay 
        value={state.displayValue} 
        expression={state.expression} 
      />
      <CalculatorKeypad 
        onKeyPress={handleKeyPress} 
        isAdvancedMode={state.isAdvancedMode}
        advancedTab={state.advancedTab}
      />
      <div className="bg-calculator-footer p-1 text-center text-xs text-white/70">
        Developed by GSS-TEC
      </div>
    </div>
  );
};

export default Calculator;
