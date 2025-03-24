
// Advanced math operations utility functions
export const calculateTrigFunction = (value: number, func: string): number => {
  const radians = value * (Math.PI / 180); // Convert degrees to radians
  
  switch (func) {
    case "sin":
      return Math.sin(radians);
    case "cos":
      return Math.cos(radians);
    case "tan":
      return Math.tan(radians);
    case "asin":
      return Math.asin(value) * (180 / Math.PI); // Return in degrees
    case "acos":
      return Math.acos(value) * (180 / Math.PI); // Return in degrees
    case "atan":
      return Math.atan(value) * (180 / Math.PI); // Return in degrees
    default:
      return 0;
  }
};

export const calculateAdvancedFunction = (value: number, func: string): number => {
  switch (func) {
    case "sqrt":
      return Math.sqrt(value);
    case "log":
      return Math.log10(value);
    case "ln":
      return Math.log(value);
    case "exp":
      return Math.exp(value);
    case "pow2":
      return Math.pow(value, 2);
    case "pow3":
      return Math.pow(value, 3);
    case "1/x":
      return 1 / value;
    default:
      return 0;
  }
};
