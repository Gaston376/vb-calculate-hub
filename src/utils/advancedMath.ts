
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
    case "sinh":
      return Math.sinh(radians);
    case "cosh":
      return Math.cosh(radians);
    case "tanh":
      return Math.tanh(radians);
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
    case "10^x":
      return Math.pow(10, value);
    case "1/x":
      return 1 / value;
    case "abs":
      return Math.abs(value);
    case "fact":
      return factorial(value);
    default:
      return 0;
  }
};

// Statistical functions
export const calculateStatFunction = (values: number[], func: string): number => {
  switch (func) {
    case "mean":
      return values.reduce((sum, val) => sum + val, 0) / values.length;
    case "median":
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0 
        ? (sorted[mid - 1] + sorted[mid]) / 2 
        : sorted[mid];
    case "stdDev":
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const squareDiffs = values.map(val => Math.pow(val - mean, 2));
      return Math.sqrt(squareDiffs.reduce((sum, val) => sum + val, 0) / values.length);
    case "sum":
      return values.reduce((sum, val) => sum + val, 0);
    default:
      return 0;
  }
};

// Unit conversion functions
export const convertUnit = (value: number, fromUnit: string, toUnit: string): number => {
  // Length conversions
  const lengthConversions: Record<string, number> = {
    "mm": 0.001,
    "cm": 0.01,
    "m": 1,
    "km": 1000,
    "in": 0.0254,
    "ft": 0.3048,
    "yd": 0.9144,
    "mi": 1609.344
  };

  // Temperature conversions need special handling
  if (fromUnit === "C" && toUnit === "F") {
    return (value * 9/5) + 32;
  } else if (fromUnit === "F" && toUnit === "C") {
    return (value - 32) * 5/9;
  } else if (fromUnit === "C" && toUnit === "K") {
    return value + 273.15;
  } else if (fromUnit === "K" && toUnit === "C") {
    return value - 273.15;
  } else if (fromUnit === "F" && toUnit === "K") {
    return (value - 32) * 5/9 + 273.15;
  } else if (fromUnit === "K" && toUnit === "F") {
    return (value - 273.15) * 9/5 + 32;
  }

  // Weight conversions
  const weightConversions: Record<string, number> = {
    "mg": 0.001,
    "g": 1,
    "kg": 1000,
    "oz": 28.3495,
    "lb": 453.592
  };

  // For simple conversions within the same category
  if (lengthConversions[fromUnit] && lengthConversions[toUnit]) {
    return value * (lengthConversions[fromUnit] / lengthConversions[toUnit]);
  } else if (weightConversions[fromUnit] && weightConversions[toUnit]) {
    return value * (weightConversions[fromUnit] / weightConversions[toUnit]);
  }

  return value; // Return original value if conversion not supported
};

// Helper functions
const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  if (!Number.isInteger(n)) return gamma(n + 1);
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Approximation of the gamma function for non-integer factorials
const gamma = (z: number): number => {
  // Lanczos approximation for the gamma function
  const p = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7
  ];
  
  if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
  
  z -= 1;
  let x = 0.99999999999980993;
  for (let i = 0; i < p.length; i++) {
    x += p[i] / (z + i + 1);
  }
  
  const t = z + p.length - 0.5;
  return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
};

// Number base conversions
export const convertBase = (num: string, fromBase: number, toBase: number): string => {
  // Convert from source base to decimal
  let decimal: number;
  
  if (fromBase === 10) {
    decimal = parseInt(num, 10);
  } else {
    decimal = parseInt(num, fromBase);
  }
  
  // Convert decimal to target base
  if (toBase === 10) {
    return decimal.toString();
  }
  
  return decimal.toString(toBase).toUpperCase();
};

// Logical operations
export const calculateLogicalOperation = (a: number, b: number, operation: string): number => {
  const intA = Math.floor(a);
  const intB = Math.floor(b);
  
  switch (operation) {
    case "AND":
      return intA & intB;
    case "OR":
      return intA | intB;
    case "XOR":
      return intA ^ intB;
    case "NOT":
      return ~intA;
    case "NAND":
      return ~(intA & intB);
    case "NOR":
      return ~(intA | intB);
    default:
      return 0;
  }
};
