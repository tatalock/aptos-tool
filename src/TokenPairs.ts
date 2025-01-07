import { AccountAddress } from "@aptos-labs/ts-sdk";

// Define an enum to represent the order states
export enum OrderState {
  None = "none",
  Asc = "asc",
  Desc = "desc",
}

export class TokenPairs {
  static AddressRegex = /0x[a-fA-F0-9]{1,64}/g;

  /**
   * Converts the given address string to its long format representation.
   * This function processes an address string, converting it into a longer, typically more detailed format.
   * It uses a regular expression to match addresses within the string and then converts them using methods provided by the AccountAddress class.
   *
   * @param address - The address string to be converted.
   * @returns The converted address string in long format.
   */
  static AddressToLong = (address: string) => {
    // Process the input address string using a regular expression, converting each matched address.
    return address.replace(TokenPairs.AddressRegex, (matched) => {
      // Convert the matched address to long format using the static from method of the AccountAddress class.
      return AccountAddress.from(matched).toStringLong();
    });
  };

  /**
   * Compares two asset types for equality.
   *
   * This function checks if two asset type strings are equal. Asset types can be represented as a combination of
   * account address, module name, and token name. If the asset type strings are incomplete or improperly formatted,
   * the function returns false.
   *
   * @param token1AssetType - The string representation of the first asset type, in the format "account_address::module_name::token_name".
   * @param token2AssetType - The string representation of the second asset type, in the format "account_address::module_name::token_name".
   * @returns true if the two asset types are equal, otherwise false.
   */
  static AssetTypeEq = (
    token1AssetType: string | undefined,
    token2AssetType: string | undefined
  ) => {
    // Check if either of the asset type strings is undefined or empty
    if (!token1AssetType || !token2AssetType) return false;

    return (
      TokenPairs.AddressToLong(token1AssetType) ===
      TokenPairs.AddressToLong(token2AssetType)
    );
  };

  /**
   * Determines the ordering relationship between two asset type pairs.
   *
   * This function compares two pairs of asset types and determines if they are in ascending ('asc'),
   * descending ('desc'), or no specific order ('none'). It uses the `AssetTypeEq` function to check
   * for equality between individual asset types within the pairs.
   *
   * @param tokenAssetPair - The first pair of asset type strings, e.g., ["asset1", "asset2"].
   * @param tokenAssetPair2 - The second pair of asset type strings, e.g., ["asset3", "asset4"].
   * @returns 'asc' if the pairs are in ascending order, 'desc' if in descending order, otherwise 'none'.
   */
  static PairsAssetTypeOrder = (
    tokenAssetPair: string[],
    tokenAssetPair2: string[]
  ): OrderState => {
    const [asset1, asset2] = tokenAssetPair;
    const [asset3, asset4] = tokenAssetPair2;

    // Check if the pairs are in ascending order
    if (
      TokenPairs.AssetTypeEq(asset1, asset3) &&
      TokenPairs.AssetTypeEq(asset2, asset4)
    ) {
      return OrderState.Asc;
    }

    // Check if the pairs are in descending order
    if (
      TokenPairs.AssetTypeEq(asset1, asset4) &&
      TokenPairs.AssetTypeEq(asset2, asset3)
    ) {
      return OrderState.Desc;
    }

    // If neither ascending nor descending, return 'none'
    return OrderState.None;
  };

  // static TokenCheck = (tokenPair: Token[]) => {
  //   if (tokenPair.length !== 2) {
  //     throw new Error("token pair length should be 2");
  //   }

  //   if (tokenPair.filter((token: any) => token.assetType).length !== 2) {
  //     throw new Error("token pair should have assetType");
  //   }
  // };
}

export default TokenPairs;
