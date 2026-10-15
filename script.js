// 1. DOM Elements
const inputElement = document.getElementById('inputValue');
const fromUnitElement = document.getElementById('fromUnit');
const toUnitElement = document.getElementById('toUnit');
const resultElement = document.getElementById('resultValue');
const formulaElement = document.getElementById('formulaText');
const resultBox = document.querySelector('.result-box');
const swapButton = document.getElementById('swapBtn');

// 2. Conversion Data & Factors
// Base units: Length = meter, Weight = kilogram
const units = {
  // Length units (relative to 1 meter)
  meters: { name: 'Meters', symbol: 'm', type: 'length', factor: 1 },
  feet: { name: 'Feet', symbol: 'ft', type: 'length', factor: 0.3048 },
  kilometers: { name: 'Kilometers', symbol: 'km', type: 'length', factor: 1000 },

  // Weight units (relative to 1 kilogram)
  kilograms: { name: 'Kilograms', symbol: 'kg', type: 'weight', factor: 1 },
  pounds: { name: 'Pounds', symbol: 'lb', type: 'weight', factor: 0.45359237 },
  grams: { name: 'Grams', symbol: 'g', type: 'weight', factor: 0.001 }
};

/**
 * Core conversion function
 * Uses conditional logic to validate unit compatibility and calculates conversion.
 * 
 * @param {number} value - The input value to convert
 * @param {string} from - Source unit key
 * @param {string} to - Target unit key
 */
function convertUnits(value, from, to) {
  const fromUnit = units[from];
  const toUnit = units[to];

  // Conditional Logic: Check for incompatible unit categories
  if (fromUnit.type !== toUnit.type) {
    return {
      success: false,
      message: `Cannot convert ${fromUnit.type} (${fromUnit.name}) to ${toUnit.type} (${toUnit.name}).`
    };
  }

  // Same unit fast path
  if (from === to) {
    return {
      success: true,
      result: value,
      rate: 1,
      symbol: toUnit.symbol
    };
  }

  // Base unit calculation:
  // 1. Convert source to base unit
  const inBaseUnit = value * fromUnit.factor;
  // 2. Convert base unit to target unit
  const finalResult = inBaseUnit / toUnit.factor;
  const unitRate = fromUnit.factor / toUnit.factor;

  return {
    success: true,
    result: finalResult,
    rate: unitRate,
    symbol: toUnit.symbol
  };
}

/**
 * Form handler: Reads input values, executes conversion, and updates DOM.
 */
function handleConversion() {
  const rawValue = inputElement.value;
  const from = fromUnitElement.value;
  const to = toUnitElement.value;

  // Handle empty input
  if (rawValue.trim() === '') {
    resultBox.classList.remove('error');
    resultElement.textContent = '--';
    formulaElement.textContent = 'Please enter a number above';
    return;
  }

  const numericValue = parseFloat(rawValue);

  // Validate number input
  if (isNaN(numericValue)) {
    resultBox.classList.add('error');
    resultElement.textContent = 'Invalid Input';
    formulaElement.textContent = 'Please enter a valid numeric value';
    return;
  }

  // Perform calculation
  const conversion = convertUnits(numericValue, from, to);

  if (!conversion.success) {
    // Incompatible units selected (e.g. Length to Weight)
    resultBox.classList.add('error');
    resultElement.textContent = 'Incompatible Units';
    formulaElement.textContent = conversion.message;
  } else {
    // Valid conversion
    resultBox.classList.remove('error');

    // Use toFixed() to round to 2 decimal places for clean readable results
    const roundedResult = conversion.result.toFixed(2);
    resultElement.textContent = `${roundedResult} ${conversion.symbol}`;

    // Display conversion rate formula
    const fromName = units[from].name;
    const toName = units[to].name;
    const roundedRate = conversion.rate.toFixed(4);
    formulaElement.textContent = `1 ${fromName} = ${roundedRate} ${toName}`;
  }
}

/**
 * Swaps the From and To units and refreshes the conversion.
 */
function swapUnits() {
  const currentFrom = fromUnitElement.value;
  const currentTo = toUnitElement.value;

  fromUnitElement.value = currentTo;
  toUnitElement.value = currentFrom;

  handleConversion();
}

// 3. Event Listeners for Live Form Handling
// 'input' event triggers live conversion as the user types
inputElement.addEventListener('input', handleConversion);

// 'change' event triggers conversion when dropdown selections change
fromUnitElement.addEventListener('change', handleConversion);
toUnitElement.addEventListener('change', handleConversion);

// Swap button click event
swapButton.addEventListener('click', swapUnits);

// Initial conversion call on page load
handleConversion();
