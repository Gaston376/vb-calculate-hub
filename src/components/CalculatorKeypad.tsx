
import React from "react";
import CalculatorKey from "@/components/CalculatorKey";
import { cn } from "@/lib/utils";

interface CalculatorKeypadProps {
  onKeyPress: (value: string) => void;
  isAdvancedMode?: boolean;
  className?: string;
}

const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onKeyPress,
  isAdvancedMode = false,
  className
}) => {
  if (isAdvancedMode) {
    return (
      <div className={cn("calculator-keypad grid grid-cols-4 gap-1 p-1 bg-calculator-keypad", className)}>
        {/* Toggle button */}
        <CalculatorKey value="ADV" onClick={onKeyPress} type="function" className="bg-blue-500 text-white" />
        <CalculatorKey value="sin" onClick={onKeyPress} type="function" />
        <CalculatorKey value="cos" onClick={onKeyPress} type="function" />
        <CalculatorKey value="tan" onClick={onKeyPress} type="function" />
        
        <CalculatorKey value="asin" onClick={onKeyPress} type="function" />
        <CalculatorKey value="acos" onClick={onKeyPress} type="function" />
        <CalculatorKey value="atan" onClick={onKeyPress} type="function" />
        <CalculatorKey value="1/x" onClick={onKeyPress} type="function" />
        
        <CalculatorKey value="sqrt" onClick={onKeyPress} type="function" />
        <CalculatorKey value="pow2" onClick={onKeyPress} type="function" ariaLabel="x squared" />
        <CalculatorKey value="pow3" onClick={onKeyPress} type="function" ariaLabel="x cubed" />
        <CalculatorKey value="exp" onClick={onKeyPress} type="function" />
        
        <CalculatorKey value="log" onClick={onKeyPress} type="function" />
        <CalculatorKey value="ln" onClick={onKeyPress} type="function" />
        <CalculatorKey value="AC" onClick={onKeyPress} type="function" />
        <CalculatorKey value="=" onClick={onKeyPress} type="equals" />
      </div>
    );
  }
  
  return (
    <div className={cn("calculator-keypad grid grid-cols-4 gap-1 p-1 bg-calculator-keypad", className)}>
      {/* Row 1 */}
      <CalculatorKey value="AC" onClick={onKeyPress} type="function" />
      <CalculatorKey value="±" onClick={onKeyPress} type="function" />
      <CalculatorKey value="%" onClick={onKeyPress} type="function" />
      <CalculatorKey value="÷" onClick={onKeyPress} type="operator" />
      
      {/* Row 2 */}
      <CalculatorKey value="7" onClick={onKeyPress} />
      <CalculatorKey value="8" onClick={onKeyPress} />
      <CalculatorKey value="9" onClick={onKeyPress} />
      <CalculatorKey value="×" onClick={onKeyPress} type="operator" />
      
      {/* Row 3 */}
      <CalculatorKey value="4" onClick={onKeyPress} />
      <CalculatorKey value="5" onClick={onKeyPress} />
      <CalculatorKey value="6" onClick={onKeyPress} />
      <CalculatorKey value="-" onClick={onKeyPress} type="operator" />
      
      {/* Row 4 */}
      <CalculatorKey value="1" onClick={onKeyPress} />
      <CalculatorKey value="2" onClick={onKeyPress} />
      <CalculatorKey value="3" onClick={onKeyPress} />
      <CalculatorKey value="+" onClick={onKeyPress} type="operator" />
      
      {/* Row 5 */}
      <CalculatorKey value="0" onClick={onKeyPress} className="col-span-2" />
      <CalculatorKey value="." onClick={onKeyPress} />
      <CalculatorKey value="ADV" onClick={onKeyPress} type="equals" ariaLabel="Advanced Mode" />
    </div>
  );
};

export default CalculatorKeypad;
