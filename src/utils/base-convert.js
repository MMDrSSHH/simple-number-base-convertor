import { toEnglishDigits } from "./persian-digit-to-english";

/**
 *
 * @param {String} n the number to be converted
 * @param {Number} a initial base
 * @param {Number} b target base
 * @returns {String} an string represinting the number in the target base
 */
export const baseFromAtoB = (n, a, b) => {
  try {
    const number = toEnglishDigits(n);
    let result = "";
    if (+a === 10) {
      // if the inital base is decimal base then just convert to target base
      result = baseFromDecToB(number, b);
    } else if (+b === 10) {
      // else if the target base is decimal then convert to the decimal right away
      result = baseFromAToDec(number, a);
    } else {
      // if nor the target nor the initial are decimal, convert to decimal first then convert the result to the target base
      const tempDecBase = baseFromAToDec(number, a);
      result = baseFromDecToB(tempDecBase, b);
    }

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

/**
 *
 * @param {String} n number
 * @param {Number} a initial base
 * @returns {String} an string of the number in decimal base
 */
const baseFromAToDec = (n, a) => {
  const [integer, fraction] = n.split(".");

  const integerDec = integer
    .split("")
    .reverse()
    .reduce((value, digit, index) => {
      return (
        value +
        (digit < 9 ? digit : digitValues.get(digit.toLowerCase())) * a ** index
      );
    }, 0);

  let result = integerDec.toString();
  if (fraction) {
    const fractionDec = fraction.split("").reduce((value, digit, index) => {
      return value + digit * a ** -(index + 1);
    }, 0);

    result = result.concat(".", fractionDec.toString());
  }

  //   return `${integerDec}.${fractionDec}`;
  //   return `${integerDec}`;
  return result;
};

/**
 *
 * @param {String} n number
 * @param {Number} b target base
 * @returns {String} an string of the number in target base
 */
const baseFromDecToB = (n, b) => {
  const [integer, fraction] = n.split(".");
  const fractionNum = Number(`.${fraction}`);

  let tempInteger = +integer;
  let intResult = "";
  while (tempInteger !== 0) {
    intResult = intResult.concat(
      tempInteger % b > 9
        ? digitSymbols.get((tempInteger % b).toString())
        : (tempInteger % b).toString()
    );
    tempInteger = Math.floor(tempInteger / b);
  }

  let result = intResult.split("").reverse().join("");

  if (fractionNum) {
    let tempFractionPart = fractionNum;
    let fractionResult = "";
    do {
      const fractionMul = tempFractionPart * b;
      tempFractionPart = fractionMul - Math.floor(fractionMul);
      fractionResult = fractionResult.concat(Math.floor(fractionMul));
    } while (tempFractionPart !== 0 && fractionResult.length <= 10);

    result = result.concat(".", fractionResult);
  }

  //   return intResult.split("").reverse().join("");
  return result;
};

// digit symbols representing 10 to 16 digits
const digitSymbols = new Map([
  ["10", "a"],
  ["11", "b"],
  ["12", "c"],
  ["13", "d"],
  ["14", "e"],
  ["15", "f"],
]);

const digitValues = new Map([
  ["a", "10"],
  ["b", "11"],
  ["c", "12"],
  ["d", "13"],
  ["e", "14"],
  ["f", "15"],
]);
