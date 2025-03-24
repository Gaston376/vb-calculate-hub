
import { CalculatorState } from "@/hooks/useCalculator";

type CalculatorActions = {
  inputDigit: (digit: string) => void;
  inputDot: () => void;
  inputOperator: (operator: string) => void;
  performCalculation: () => void;
  clearAll: () => void;
  inputPercent: () => void;
  toggleSign: () => void;
};

export const setupKeyboardHandler = (
  state: CalculatorState,
  actions: CalculatorActions
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    
    if (/[0-9]/.test(key)) {
      event.preventDefault();
      actions.inputDigit(key);
    } else if (key === ".") {
      event.preventDefault();
      actions.inputDot();
    } else if (key === "+" || key === "-") {
      event.preventDefault();
      actions.inputOperator(key);
    } else if (key === "*") {
      event.preventDefault();
      actions.inputOperator("×");
    } else if (key === "/") {
      event.preventDefault();
      actions.inputOperator("÷");
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      actions.performCalculation();
    } else if (key === "Escape") {
      event.preventDefault();
      actions.clearAll();
    } else if (key === "%") {
      event.preventDefault();
      actions.inputPercent();
    }
  };

  return handleKeyDown;
};
