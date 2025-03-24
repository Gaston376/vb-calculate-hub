
import React, { useState, useEffect } from "react";
import CalculatorDisplay from "@/components/CalculatorDisplay";
import CalculatorKeypad from "@/components/CalculatorKeypad";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CalculatorProps {
  className?: string;
}

type CalculatorState = {
  value: string;
  displayValue: string;
  operator: string | null;
  waitingForOperand: boolean;
  previousValue: string | null;
  expression: string;
};

const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [state, setState] = useState<CalculatorState>({
    value: "0",
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
    previousValue: null,
    expression: ""
  });

  const handleKeyPress = (key: string) => {
    switch (key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        inputDigit(key);
        break;
      case ".":
        inputDot();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        inputOperator(key);
        break;
      case "=":
        performCalculation();
        break;
      case "AC":
        clearAll();
        break;
      case "±":
        toggleSign();
        break;
      case "%":
        inputPercent();
        break;
      default:
        break;
    }
  };

  const inputDigit = (digit: string) => {
    const { displayValue, waitingForOperand } = state;

    if (waitingForOperand) {
      setState({
        ...state,
        displayValue: digit,
        value: digit,
        waitingForOperand: false
      });
    } else {
      setState({
        ...state,
        displayValue:
          displayValue === "0" ? digit : displayValue + digit,
        value: displayValue === "0" ? digit : displayValue + digit
      });
    }
  };

  const inputDot = () => {
    const { displayValue, waitingForOperand } = state;

    if (waitingForOperand) {
      setState({
        ...state,
        displayValue: "0.",
        value: "0.",
        waitingForOperand: false
      });
    } else if (displayValue.indexOf(".") === -1) {
      setState({
        ...state,
        displayValue: displayValue + ".",
        value: displayValue + ".",
        waitingForOperand: false
      });
    }
  };

  const inputOperator = (nextOperator: string) => {
    const { displayValue, operator, value, previousValue, waitingForOperand } = state;

    // Convert string representations to their actual operator symbols
    const getOperator = (op: string) => {
      switch (op) {
        case "×": return "*";
        case "÷": return "/";
        default: return op;
      }
    };

    const getDisplayOperator = (op: string) => {
      switch (op) {
        case "*": return "×";
        case "/": return "÷";
        default: return op;
      }
    };

    if (previousValue === null) {
      setState({
        ...state,
        operator: nextOperator,
        previousValue: displayValue,
        waitingForOperand: true,
        expression: `${displayValue} ${nextOperator}`
      });
      return;
    }

    if (waitingForOperand) {
      setState({
        ...state,
        operator: nextOperator,
        expression: previousValue + " " + nextOperator
      });
      return;
    }

    const currentValue = parseFloat(displayValue);
    let newValue;

    if (operator) {
      try {
        // Safely evaluate the expression
        const actualOperator = getOperator(operator);
        newValue = eval(`${parseFloat(previousValue || "0")} ${actualOperator} ${currentValue}`);
        
        if (!isFinite(newValue)) {
          throw new Error("Invalid calculation");
        }
      } catch (e) {
        toast.error("Division by zero error");
        newValue = "Error";
      }
    } else {
      newValue = currentValue;
    }

    const stringValue = newValue.toString();

    setState({
      ...state,
      displayValue: stringValue,
      value: stringValue,
      previousValue: stringValue,
      operator: nextOperator,
      waitingForOperand: true,
      expression: `${stringValue} ${nextOperator}`
    });
  };

  const performCalculation = () => {
    const { displayValue, operator, previousValue, waitingForOperand } = state;

    if (previousValue === null || waitingForOperand || !operator) {
      return;
    }

    // Convert string representations to their actual operator symbols
    const getOperator = (op: string) => {
      switch (op) {
        case "×": return "*";
        case "÷": return "/";
        default: return op;
      }
    };

    try {
      const currentValue = parseFloat(displayValue);
      const actualOperator = getOperator(operator);
      let newValue;

      // Safely evaluate the expression
      newValue = eval(`${parseFloat(previousValue)} ${actualOperator} ${currentValue}`);
      
      if (!isFinite(newValue)) {
        throw new Error("Invalid calculation");
      }

      const stringValue = newValue.toString();
      const expression = `${previousValue} ${operator} ${displayValue} =`;

      setState({
        ...state,
        displayValue: stringValue,
        value: stringValue,
        expression: expression,
        previousValue: null,
        operator: null,
        waitingForOperand: true
      });
    } catch (e) {
      toast.error("Division by zero error");
      setState({
        ...state,
        displayValue: "Error",
        value: "Error",
        expression: "",
        waitingForOperand: true
      });
    }
  };

  const clearAll = () => {
    setState({
      value: "0",
      displayValue: "0",
      operator: null,
      waitingForOperand: false,
      previousValue: null,
      expression: ""
    });
  };

  const toggleSign = () => {
    const { displayValue } = state;
    const newValue = parseFloat(displayValue) * -1;
    
    setState({
      ...state,
      displayValue: newValue.toString(),
      value: newValue.toString()
    });
  };

  const inputPercent = () => {
    const { displayValue } = state;
    const currentValue = parseFloat(displayValue);
    const newValue = currentValue / 100;
    
    setState({
      ...state,
      displayValue: newValue.toString(),
      value: newValue.toString(),
      waitingForOperand: false
    });
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (/[0-9]/.test(key)) {
        event.preventDefault();
        handleKeyPress(key);
      } else if (key === ".") {
        event.preventDefault();
        handleKeyPress(".");
      } else if (key === "+" || key === "-") {
        event.preventDefault();
        handleKeyPress(key);
      } else if (key === "*") {
        event.preventDefault();
        handleKeyPress("×");
      } else if (key === "/") {
        event.preventDefault();
        handleKeyPress("÷");
      } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        handleKeyPress("=");
      } else if (key === "Escape") {
        event.preventDefault();
        handleKeyPress("AC");
      } else if (key === "%") {
        event.preventDefault();
        handleKeyPress("%");
      } else if (key === "Backspace") {
        event.preventDefault();
        // Implement backspace functionality if needed
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state]);

  return (
    <div 
      className={cn(
        "w-full max-w-xs md:max-w-sm rounded-2xl overflow-hidden shadow-calculator backdrop-blur-sm transition-all duration-300",
        "animate-scale-in",
        className
      )}
    >
      <CalculatorDisplay 
        value={state.displayValue} 
        expression={state.expression} 
      />
      <CalculatorKeypad onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Calculator;
