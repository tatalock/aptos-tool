import {
  AccountAddress,
  createObjectAddress,
  Serializer,
} from "@aptos-labs/ts-sdk";
import BigNumber from "bignumber.js";
import { APTOS_COIN_TYPE, USDT_DECIMALS } from "./config";
import TokenPairs from "./TokenPairs";
import { StringToUint8Array } from "./utils";

BigNumber.config({
  EXPONENTIAL_AT: [-20, 20],
});

class Token {
  name: string = "";
  symbol: string = "";
  decimals: number = 8;
  index: number | string = "";
  tags: string[] = [];
  bridge: string = "";
  price: number | string = 0;
  priceU: number | string = 0;
  balance: number = 0;
  assetType: `${string}::${string}::${string}` | string = "";
  coinType?: `${string}::${string}::${string}` | string = "";
  faType?: string = "";
  logoUrl?: string;
  coingeckoId?: string;
  coinMarketcapId?: string;

  constructor(args: {
    name: string;
    symbol: string;
    decimals: number;
    assetType: `${string}::${string}::${string}` | string;
    coinType?: `${string}::${string}::${string}` | string;
    faType?: string;
    index?: number | string;
    tags?: string[];
    bridge?: string;
    price?: number | string;
    priceU?: number | string;
    balance?: number;
    logoUrl?: string;
    coingeckoId?: string;
    coinMarketcapId?: string;
  }) {
    Object.assign(this, args);
    this.faTypeCalculate();
  }

  faTypeCalculate() {
    if (!this.coinType) return;

    // APT
    if (TokenPairs.AssetTypeEq(this.coinType, APTOS_COIN_TYPE)) {
      this.faType = "0xa";
      return;
    }

    const [contractAddress, moduleName, functionName] =
      this.coinType.split("::");

    const shortContractAddress = [
      AccountAddress.from(contractAddress).toString(),
      moduleName,
      functionName,
    ].join("::");

    const ser = new Serializer();
    ser.serializeFixedBytes(StringToUint8Array(shortContractAddress));
    const faType = createObjectAddress(
      AccountAddress.from("0xa"),
      ser.toUint8Array()
    );
    this.faType = faType.toString();
  }

  //  == Display ==
  priceDisplay(amount: DexNumberString, precision: number = 4) {
    return new BigNumber(this.price || 0)
      .times(amount || 0)
      .dp(precision)
      .toFormat();
  }

  priceDisplayWithSymbol(amount: DexNumberString, precision: number = 4) {
    return `${this.priceDisplay(amount, precision)} ${this.symbol}`;
  }

  priceInUSDT(APTPrice: number | BigNumber = 0) {
    return new BigNumber(this.price || 0)
      .times(APTPrice)
      .dp(USDT_DECIMALS)
      .toNumber();
  }

  volumeInUSDT(APTPrice: number | BigNumber = 0) {
    return Token.amountInDecimal(this.balance, this.decimals)
      .times(this.priceInUSDT(APTPrice))
      .dp(USDT_DECIMALS)
      .toString();
  }

  volumeInUSDTByBalance(
    balance: string | number | BigNumber = 0,
    APTPrice: number | BigNumber = 0
  ) {
    return (
      new BigNumber(balance || 0)
        .times(this.priceInUSDT(APTPrice))
        .dp(USDT_DECIMALS)
        .toString() || 0
    );
  }

  get submitAssetType() {
    return this.coinType || this.faType || "";
  }

  /**
   *
   * @param amount token amount in minimum unit (integer)
   * @param decimals target token decimals
   * @returns BigNumber
   *
   * @example
   * Token.amountInDecimal(100000000, 8) // 1
   * Token.amountInDecimal(100000000, 6) // 100
   */
  static amountInDecimal(
    amount: DexNumberString,
    decimals: number = 8
  ): BigNumber {
    return new BigNumber(amount || 0)
      .shiftedBy(-1 * decimals)
      .dp(Number(decimals));
  }

  /**
   *
   * @param amount token amount in decimal
   * @param decimals  target token decimals
   * @returns BigNumber
   *
   * @example
   * Token.amountInUnit(1, 8) // 100000000
   * Token.amountInUnit(100, 6) // 100000000
   */
  static amountInUnit(
    amount: DexNumberString,
    decimals: number = 8
  ): BigNumber {
    return new BigNumber(amount || 0).shiftedBy(decimals);
  }

  /**
   *
   * @param balance token balance in minimum unit
   * @param token Token
   * @returns token balance in decimal
   *
   * @example
   * Token.balanceInDecimal(100000000, token) // 1
   */
  static balanceInUSDT(balance: number, token: Token): string {
    const usd: BigNumber = new BigNumber(balance || 0)
      .shiftedBy(-1 * token.decimals)
      .times(token.price);

    if (BigNumber(usd).isEqualTo(0)) return "$0";
    return BigNumber(usd).isLessThan(0.001)
      ? "< $0.001"
      : `$ ${usd.dp(3).toFormat()}`;
  }

  /**
   *
   * @param balance token balance in minimum unit
   * @param token Token
   * @returns token balance in decimal
   *
   * @example
   * Token.balanceInDecimal(100000000, token) // 1
   */
  currentBalanceInUSDT(): string {
    return Token.balanceInUSDT(this.balance, this);
  }

  /**
   *
   * @returns token balance in decimal
   *
   * @example
   * const token = new Token({balance: 100000000, decimals: 8})
   *
   * token.balanceInDecimal() // 1
   */
  balanceInDecimal(): BigNumber {
    return Token.amountInDecimal(this.balance, this.decimals);
  }

  /**
   *
   * @returns token balance in display format, with comma and decimal
   *
   * @example
   * const token = new Token({balance: 12345678900000, decimals: 8})
   *
   * token.balanceDisplay() // 12,345.6789
   */
  balanceDisplay(): string {
    return new BigNumber(this.balance || 0)
      .shiftedBy(-1 * this.decimals)
      .toFormat();
  }

  /**
   *
   * @returns token balance in display format with symbol, with comma and decimal
   *
   * const token = new Token({balance: 12345678900000, decimals: 8})
   *
   * token.balanceDisplayWithSymbol() // 12,345.6789 APT
   */
  balanceDisplayWithSymbol(): string {
    return `${this.balanceDisplay()} ${this.symbol}`;
  }

  /**
   *
   * @param amount token amount in minimum unit
   * @returns
   *
   * @example
   * const token = new Token({balance: 100000000, decimals: 8})
   *
   * token.isInsufficientBalance(100000001) // true
   * token.isInsufficientBalance(100000000) // false
   */
  isInsufficientBalance(amount: DexNumberString) {
    return new BigNumber(this.balance).isLessThan(amount);
  }

  /**
   *
   * @param amount token amount in decimal
   * @returns
   *
   * @example
   * const token = new Token({balance: 1, decimals: 8})
   *
   * token.isInsufficientBalanceWithDecimal(1.00000001) // true
   * token.isInsufficientBalanceWithDecimal(1) // false
   */
  isInsufficientBalanceWithDecimal(amount: DexNumberString) {
    return this.balanceInDecimal().isLessThan(amount);
  }

  isTheToken(token: Token) {
    return (
      TokenPairs.AssetTypeEq(this.coinType, token.coinType) ||
      TokenPairs.AssetTypeEq(this.faType, token.faType)
    );
  }

  clearBalance() {
    this.balance = 0;
  }
}

export default Token;
