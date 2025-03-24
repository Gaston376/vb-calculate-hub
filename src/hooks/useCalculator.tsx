
import { useState } from "react";
import { toast } from "sonner";
import { 
  calculateTrigFunction, 
  calculateAdvancedFunction, 
  calculateStatFunction, 
  convertUnit,
  convertBase,
  calculateLogicalOperation
} from "@/utils/advancedMath";

export type CalculatorState = {
  value: string;
  displayValue: string;
  operator: string | null;
  waitingForOperand: boolean;
  previousValue: string | null;
  expression: string;
  isAdvancedMode: boolean;
  advancedTab: string;
  memory: number[];
  base: number;
};

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>({
    value: "0",
    displayValue: "0",
    operator: null,
    waitingForOperand: false,
    previousValue: null,
    expression: "",
    isAdvancedMode: false,
    advancedTab: "trig",
    memory: [],
    base: 10
  });

  const toggleAdvancedMode = () => {
    setState(prevState => ({
      ...prevState,
      isAdvancedMode: !prevState.isAdvancedMode,
      advancedTab: "trig"
    }));
    
    if (!state.isAdvancedMode) {
      toast.success("GSS-TEC Advanced Calculator", {
        description: "Powerful scientific functions at your fingertips.",
        duration: 3000
      });
    }
  };

  const changeAdvancedTab = (tab: string) => {
    setState({
      ...state,
      advancedTab: tab.toLowerCase()
    });
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

    const getOperator = (op: string) => {
      switch (op) {
        case "×": return "*";
        case "÷": return "/";
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
      expression: "",
      isAdvancedMode: state.isAdvancedMode,
      advancedTab: state.advancedTab,
      memory: [],
      base: 10
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

  const inputConstant = (value: number) => {
    setState({
      ...state,
      displayValue: value.toString(),
      value: value.toString(),
      waitingForOperand: false
    });
  };

  const applyTrigFunction = (func: string) => {
    const { displayValue } = state;
    const currentValue = parseFloat(displayValue);
    
    try {
      const result = calculateTrigFunction(currentValue, func);
      
      if (!isFinite(result)) {
        throw new Error("Invalid calculation");
      }
      
      const stringResult = result.toString();
      setState({
        ...state,
        displayValue: stringResult,
        value: stringResult,
        waitingForOperand: true,
        expression: `${func}(${displayValue}) = ${stringResult}`
      });
    } catch (e) {
      toast.error("Invalid input for function");
      setState({
        ...state,
        displayValue: "Error",
        value: "Error",
        waitingForOperand: true
      });
    }
  };

  const applyAdvancedFunction = (func: string) => {
    const { displayValue } = state;
    const currentValue = parseFloat(displayValue);
    
    try {
      const result = calculateAdvancedFunction(currentValue, func);
      
      if (!isFinite(result)) {
        throw new Error("Invalid calculation");
      }
      
      const stringResult = result.toString();
      const displayFunc = 
        func === "pow2" ? "sqr" : 
        func === "pow3" ? "cube" : 
        func === "10^x" ? "10^" : func;
        
      setState({
        ...state,
        displayValue: stringResult,
        value: stringResult,
        waitingForOperand: true,
        expression: `${displayFunc}(${displayValue}) = ${stringResult}`
      });
    } catch (e) {
      toast.error("Invalid input for function");
      setState({
        ...state,
        displayValue: "Error",
        value: "Error",
        waitingForOperand: true
      });
    }
  };

  const performConversion = (fromUnit: string, toUnit: string) => {
    const { displayValue } = state;
    const currentValue = parseFloat(displayValue);
    
    try {
      const result = convertUnit(currentValue, fromUnit, toUnit);
      
      if (!isFinite(result)) {
        throw new Error("Invalid conversion");
      }
      
      const stringResult = result.toString();
      setState({
        ...state,
        displayValue: stringResult,
        value: stringResult,
        waitingForOperand: true,
        expression: `${currentValue} ${fromUnit} = ${stringResult} ${toUnit}`
      });
    } catch (e) {
      toast.error("Invalid conversion");
      setState({
        ...state,
        displayValue: "Error",
        value: "Error",
        waitingForOperand: true
      });
    }
  };

  const changeBase = (newBase: number) => {
    const { displayValue, base } = state;
    
    try {
      if (displayValue === "Error") return;
      
      const decimalValue = base === 10 
        ? parseFloat(displayValue) 
        : parseInt(displayValue, base);
        
      const result = convertBase(decimalValue.toString(), 10, newBase);
      
      setState({
        ...state,
        displayValue: result,
        value: result,
        base: newBase,
        waitingForOperand: true,
        expression: `${displayValue}_${base} = ${result}_${newBase}`
      });
    } catch (e) {
      toast.error("Invalid base conversion");
      setState({
        ...state,
        displayValue: "Error",
        value: "Error",
        waitingForOperand: true
      });
    }
  };

  return {
    state,
    actions: {
      toggleAdvancedMode,
      changeAdvancedTab,
      inputDigit,
      inputDot,
      inputOperator,
      performCalculation,
      clearAll,
      toggleSign,
      inputPercent,
      inputConstant,
      applyTrigFunction,
      applyAdvancedFunction,
      performConversion,
      changeBase
    }
  };
};
