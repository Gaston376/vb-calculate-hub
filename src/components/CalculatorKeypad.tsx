
import React from "react";
import CalculatorKey from "@/components/CalculatorKey";
import { cn } from "@/lib/utils";

interface CalculatorKeypadProps {
  onKeyPress: (value: string) => void;
  className?: string;
}

const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onKeyPress,
  className
}) => {
  return (
    <div className={cn("calculator-keypad", className)}>
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
      <CalculatorKey value="=" onClick={onKeyPress} type="equals" />
    </div>
  );
};

export default CalculatorKeypad;
