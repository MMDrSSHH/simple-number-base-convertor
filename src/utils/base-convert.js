/**
 *
 * @param {String} n the number to be converted
 * @param {Number} a initial base
 * @param {Number} b target base
 * @returns {String} an string represinting the number in the target base
 */
export const baseFromAtoB = (n, a, b) => {
  try {
    let result = "";
    if (+a === 10) {
      // if the inital base is decimal base then just convert to target base
      result = baseFromDecToB(n, b);
    } else if (+b === 10) {
      // else if the target base is decimal then convert to the decimal right away
      result = baseFromAToDec(n, a);
    } else {
      // if nor the target nor the initial are decimal, convert to decimal first then convert the result to the target base
      const tempDecBase = baseFromAToDec(n, a);
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
      return value + digit * a ** index;
    }, 0);

  //   const fractionDec = fraction.split("").reduce((value, digit, index) => {
  //     return value + digit * a ** -(index + 1);
  //   }, 0);

  //   return `${integerDec}.${fractionDec}`;
  return `${integerDec}`;
};

/**
 *
 * @param {String} n number
 * @param {Number} b target base
 * @returns {String} an string of the number in target base
 */
const baseFromDecToB = (n, b) => {
  const [integer, fraction] = n.split(".");

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

  return intResult.split("").reverse().join("");
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
