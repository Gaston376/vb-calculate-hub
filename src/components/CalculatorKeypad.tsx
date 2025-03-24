
import React from "react";
import CalculatorKey from "@/components/CalculatorKey";
import { cn } from "@/lib/utils";

interface CalculatorKeypadProps {
  onKeyPress: (value: string) => void;
  isAdvancedMode?: boolean;
  advancedTab?: string;
  className?: string;
}

const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({
  onKeyPress,
  isAdvancedMode = false,
  advancedTab = "trig",
  className
}) => {
  if (isAdvancedMode) {
    return (
      <div className={cn("calculator-keypad", className)}>
        <div className="grid grid-cols-4 gap-1 p-1 mb-1 bg-calculator-keypad">
          <CalculatorKey value="BASIC" onClick={onKeyPress} type="function" className="bg-blue-500 text-white" />
          <CalculatorKey value="TRIG" onClick={onKeyPress} type="tab" className={advancedTab === "trig" ? "bg-green-500 text-white" : ""} />
          <CalculatorKey value="STAT" onClick={onKeyPress} type="tab" className={advancedTab === "stat" ? "bg-green-500 text-white" : ""} />
          <CalculatorKey value="CONV" onClick={onKeyPress} type="tab" className={advancedTab === "conv" ? "bg-green-500 text-white" : ""} />
        </div>
        
        {advancedTab === "trig" && (
          <div className="grid grid-cols-4 gap-1 p-1 bg-calculator-keypad">
            <CalculatorKey value="sin" onClick={onKeyPress} type="function" />
            <CalculatorKey value="cos" onClick={onKeyPress} type="function" />
            <CalculatorKey value="tan" onClick={onKeyPress} type="function" />
            <CalculatorKey value="AC" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="asin" onClick={onKeyPress} type="function" />
            <CalculatorKey value="acos" onClick={onKeyPress} type="function" />
            <CalculatorKey value="atan" onClick={onKeyPress} type="function" />
            <CalculatorKey value="π" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="sinh" onClick={onKeyPress} type="function" />
            <CalculatorKey value="cosh" onClick={onKeyPress} type="function" />
            <CalculatorKey value="tanh" onClick={onKeyPress} type="function" />
            <CalculatorKey value="e" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="sqrt" onClick={onKeyPress} type="function" />
            <CalculatorKey value="pow2" onClick={onKeyPress} type="function" ariaLabel="x squared" />
            <CalculatorKey value="pow3" onClick={onKeyPress} type="function" ariaLabel="x cubed" />
            <CalculatorKey value="=" onClick={onKeyPress} type="equals" />
          </div>
        )}
        
        {advancedTab === "stat" && (
          <div className="grid grid-cols-4 gap-1 p-1 bg-calculator-keypad">
            <CalculatorKey value="mean" onClick={onKeyPress} type="function" />
            <CalculatorKey value="median" onClick={onKeyPress} type="function" />
            <CalculatorKey value="stdDev" onClick={onKeyPress} type="function" />
            <CalculatorKey value="AC" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="sum" onClick={onKeyPress} type="function" />
            <CalculatorKey value="abs" onClick={onKeyPress} type="function" />
            <CalculatorKey value="fact" onClick={onKeyPress} type="function" ariaLabel="factorial" />
            <CalculatorKey value="1/x" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="log" onClick={onKeyPress} type="function" />
            <CalculatorKey value="ln" onClick={onKeyPress} type="function" />
            <CalculatorKey value="exp" onClick={onKeyPress} type="function" />
            <CalculatorKey value="10^x" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="DATA" onClick={onKeyPress} type="function" className="bg-yellow-500" />
            <CalculatorKey value="(" onClick={onKeyPress} type="function" />
            <CalculatorKey value=")" onClick={onKeyPress} type="function" />
            <CalculatorKey value="=" onClick={onKeyPress} type="equals" />
          </div>
        )}
        
        {advancedTab === "conv" && (
          <div className="grid grid-cols-4 gap-1 p-1 bg-calculator-keypad">
            <CalculatorKey value="km→mi" onClick={onKeyPress} type="function" />
            <CalculatorKey value="mi→km" onClick={onKeyPress} type="function" />
            <CalculatorKey value="m→ft" onClick={onKeyPress} type="function" />
            <CalculatorKey value="AC" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="ft→m" onClick={onKeyPress} type="function" />
            <CalculatorKey value="kg→lb" onClick={onKeyPress} type="function" />
            <CalculatorKey value="lb→kg" onClick={onKeyPress} type="function" />
            <CalculatorKey value="C→F" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="F→C" onClick={onKeyPress} type="function" />
            <CalculatorKey value="BIN" onClick={onKeyPress} type="function" />
            <CalculatorKey value="HEX" onClick={onKeyPress} type="function" />
            <CalculatorKey value="OCT" onClick={onKeyPress} type="function" />
            
            <CalculatorKey value="AND" onClick={onKeyPress} type="function" />
            <CalculatorKey value="OR" onClick={onKeyPress} type="function" />
            <CalculatorKey value="XOR" onClick={onKeyPress} type="function" />
            <CalculatorKey value="=" onClick={onKeyPress} type="equals" />
          </div>
        )}
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
      <CalculatorKey value="BASIC" onClick={onKeyPress} type="equals" ariaLabel="Advanced Mode" />
    </div>
  );
};

export default CalculatorKeypad;
