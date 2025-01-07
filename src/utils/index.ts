import BigNumber from "bignumber.js";

/**
 * Converts a string to a Uint8Array.
 * This function is useful for scenarios where string data needs to be represented in binary form, such as network transmission or binary file operations.
 *
 * @param str - The string to be converted.
 * @returns A Uint8Array containing the binary representation of the input string.
 */
export const StringToUint8Array = (str: string) => {
  // Creates an ArrayBuffer with the same length as the string to store binary data
  const buf = new ArrayBuffer(str.length);
  // Creates a Uint8Array view to manipulate the binary data within the ArrayBuffer
  const bufView = new Uint8Array(buf);
  // Iterates over each character in the string, converts it to its Unicode code point, and stores it in the Uint8Array
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  // Returns the resulting Uint8Array
  return bufView;
};

/**
 * Shortens the given address string by retaining only the prefix and suffix parts.
 *
 * This function is designed to display long addresses in a more concise manner on the interface,
 * by showing only the beginning and end of the address and replacing the middle part with an ellipsis.
 * This maintains the uniqueness of the address while improving readability and interface cleanliness.
 *
 * @param address - The address string, expected to be in a long format.
 * @param opts - Optional parameters object, containing the lengths of the prefix and suffix.
 *               Default values are 6 characters for the prefix and 4 characters for the suffix.
 * @returns The formatted shortened address string. Returns an empty string if the input address is empty or "0".
 */
export const ShortAddress = (
  address: string,
  opts: { prefixLen: number; suffixLen: number } = {
    prefixLen: 6,
    suffixLen: 4,
  }
) => {
  // Create a regular expression to match and replace the middle part of the address
  const reg: RegExp = new RegExp(
    `(^\\S{${opts.prefixLen}})(\\S*)(\\S{${opts.suffixLen}})$`
  );
  // Format the address based on the condition
  return address && address !== "0" ? address.replace(reg, "$1...$3") : "";
};

/**
 * Formats a given number as a percentage string.
 *
 * This function takes a numerator and a denominator, divides the numerator by the denominator,
 * multiplies the result by 100, and formats it as a percentage with a specified precision.
 *
 * @param numerator {DexNumberString} - The numerator, which can be a number, string, or BigNumber, defaults to 0.
 * @param denominator {DexNumberString} - The denominator, which can be a number, string, or BigNumber, defaults to 1.
 * @param precision - The number of decimal places in the result, defaults to 2.
 * @returns The formatted percentage string.
 */
export const PercentFormat = (
  numerator: DexNumberString = 0,
  denominator: DexNumberString = 1,
  precision: number = 2
): BigNumber => {
  if (BigNumber(denominator).isNaN() || BigNumber(denominator).isZero())
    return BigNumber(0);

  return BigNumber(numerator).div(denominator).times(100).dp(precision);
};

/**
 * Formats the given number into a string with a standard format.
 *
 * This function accepts a number, string, or BigNumber instance as input and returns it as a formatted string.
 * The formatted string adheres to the formatting rules of the BigNumber.js library, which is suitable for financial calculations or handling large numbers.
 *
 * @param num {DexNumberString} - The input number, which can be a number, string, or BigNumber instance. Defaults to 0.
 * @returns {string} - The formatted string representation of the input number.
 */
export const NumberFormat = (num: DexNumberString = 0) => {
  // Utilizes the BigNumber library for formatting to ensure precision and compatibility
  return new BigNumber(num).toFormat();
};
