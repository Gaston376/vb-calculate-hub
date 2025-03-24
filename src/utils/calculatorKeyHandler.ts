
import { toast } from "sonner";

type CalculatorActions = {
  inputDigit: (digit: string) => void;
  inputDot: () => void;
  inputOperator: (operator: string) => void;
  performCalculation: () => void;
  clearAll: () => void;
  toggleSign: () => void;
  inputPercent: () => void;
  toggleAdvancedMode: () => void;
  changeAdvancedTab: (tab: string) => void;
  applyTrigFunction: (func: string) => void;
  applyAdvancedFunction: (func: string) => void;
  inputConstant: (value: number) => void;
  performConversion: (fromUnit: string, toUnit: string) => void;
  changeBase: (base: number) => void;
};

export const handleCalculatorKey = (key: string, actions: CalculatorActions) => {
  if (key === "TRIG" || key === "STAT" || key === "CONV") {
    actions.changeAdvancedTab(key);
    return;
  }

  if (key === "BASIC") {
    actions.toggleAdvancedMode();
    return;
  }

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
      actions.inputDigit(key);
      break;
    case ".":
      actions.inputDot();
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      actions.inputOperator(key);
      break;
    case "=":
      actions.performCalculation();
      break;
    case "AC":
      actions.clearAll();
      break;
    case "±":
      actions.toggleSign();
      break;
    case "%":
      actions.inputPercent();
      break;
    case "sin":
    case "cos":
    case "tan":
    case "asin":
    case "acos":
    case "atan":
    case "sinh":
    case "cosh":
    case "tanh":
      actions.applyTrigFunction(key);
      break;
    case "sqrt":
    case "log":
    case "ln":
    case "exp":
    case "pow2":
    case "pow3":
    case "10^x":
    case "1/x":
    case "abs":
    case "fact":
      actions.applyAdvancedFunction(key);
      break;
    case "π":
      actions.inputConstant(Math.PI);
      break;
    case "e":
      actions.inputConstant(Math.E);
      break;
    case "(":
    case ")":
      break;
    case "DATA":
      toast.info("Data entry mode", {
        description: "Enter numbers separated by commas for statistical functions."
      });
      break;
    case "mean":
    case "median":
    case "stdDev":
    case "sum":
      toast.info("Statistical functions require data entry", {
        description: "Use DATA button to enter multiple values."
      });
      break;
    case "km→mi":
      actions.performConversion("km", "mi");
      break;
    case "mi→km":
      actions.performConversion("mi", "km");
      break;
    case "m→ft":
      actions.performConversion("m", "ft");
      break;
    case "ft→m":
      actions.performConversion("ft", "m");
      break;
    case "kg→lb":
      actions.performConversion("kg", "lb");
      break;
    case "lb→kg":
      actions.performConversion("lb", "kg");
      break;
    case "C→F":
      actions.performConversion("C", "F");
      break;
    case "F→C":
      actions.performConversion("F", "C");
      break;
    case "BIN":
      actions.changeBase(2);
      break;
    case "HEX":
      actions.changeBase(16);
      break;
    case "OCT":
      actions.changeBase(8);
      break;
    case "AND":
    case "OR":
    case "XOR":
    case "NOT":
      toast.info("Logical operations", {
        description: "Use binary numbers for logical operations."
      });
      break;
    default:
      break;
  }
};
