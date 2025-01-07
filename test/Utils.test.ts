import BigNumber from "bignumber.js";
import { describe, expect, test } from "vitest";
import { PercentFormat, ShortAddress, StringToUint8Array } from "../src/utils";

test("ShortAddress", () => {
  describe("should return an empty string for an empty address", () => {
    expect(ShortAddress("")).toBe("");
  });

  describe("should return an empty string for an address of '0'", () => {
    expect(ShortAddress("0")).toBe("");
  });

  describe("should return a shortened address for a valid address", () => {
    expect(ShortAddress("0x1234567890abcdef")).toBe("0x123456...cdef");
  });

  describe("should handle custom prefix and suffix lengths", () => {
    expect(
      ShortAddress("0x1234567890abcdef", { prefixLen: 4, suffixLen: 3 })
    ).toBe("0x1234...cde");
  });

  describe("should return the full address if it's shorter than prefix + suffix", () => {
    expect(ShortAddress("0x1234567")).toBe("0x1234567");
  });
});

test("StringToUint8Array", () => {
  describe("should convert an empty string to an empty Uint8Array", () => {
    const result = StringToUint8Array("");
    expect(result).toEqual(new Uint8Array([]));
  });

  describe("should convert a single character string to a Uint8Array with one element", () => {
    const result = StringToUint8Array("A");
    expect(result).toEqual(new Uint8Array([65]));
  });

  describe("should convert a multi-character string to a Uint8Array with corresponding Unicode values", () => {
    const result = StringToUint8Array("Hello");
    expect(result).toEqual(new Uint8Array([72, 101, 108, 108, 111]));
  });

  describe("should handle special characters correctly", () => {
    const result = StringToUint8Array("!@#");
    expect(result).toEqual(new Uint8Array([33, 64, 35]));
  });

  describe("should handle Unicode characters correctly", () => {
    const result = StringToUint8Array("😊");
    expect(result).toEqual(new Uint8Array([240, 159, 146, 150]));
  });

  describe("should handle boundary ASCII characters correctly", () => {
    const result = StringToUint8Array(String.fromCharCode(127));
    expect(result).toEqual(new Uint8Array([127]));
  });
});

test("PercentFormat", () => {
  describe("should return 0 when denominator is NaN", () => {
    expect(PercentFormat(10, NaN)).to.deep.equal(new BigNumber(0));
  });

  describe("should return 0 when denominator is zero", () => {
    expect(PercentFormat(10, 0)).to.deep.equal(new BigNumber(0));
  });

  describe("should calculate percentage correctly with valid inputs", () => {
    expect(PercentFormat(1, 2)).to.deep.equal(new BigNumber(50));
  });

  describe("should handle precision correctly", () => {
    expect(PercentFormat(1, 3, 3)).to.deep.equal(new BigNumber(33.333));
  });

  describe("should handle string inputs correctly", () => {
    expect(PercentFormat("1", "2")).to.deep.equal(new BigNumber(50));
  });

  describe("should handle BigNumber inputs correctly", () => {
    expect(PercentFormat(new BigNumber(1), new BigNumber(2))).to.deep.equal(
      new BigNumber(50)
    );
  });
});
