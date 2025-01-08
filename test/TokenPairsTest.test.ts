import { describe, expect, test } from "vitest";
import { TokenPairs } from "../src/TokenPairs";

// AddressRegex
test(`TokenPairs AddressRegex: ${TokenPairs.AddressRegex}`, () => {
  // Short type
  expect("0xa".match(TokenPairs.AddressRegex)?.[0]).toEqual("0xa");
  expect("0x0000a".match(TokenPairs.AddressRegex)?.[0]).toEqual("0x0000a");
  expect("0x12324a".match(TokenPairs.AddressRegex)?.[0]).toEqual("0x12324a");

  // Full type
  expect(
    "0xa095c334885aa31ef36d7c1bf19fe094badba44f549019824984326a535035ea".match(
      TokenPairs.AddressRegex
    )?.[0]
  ).toEqual(
    "0xa095c334885aa31ef36d7c1bf19fe094badba44f549019824984326a535035ea"
  );

  //   Extract the first address
  expect(
    "0x1::aptos_coin::AptosCoin".match(TokenPairs.AddressRegex)?.[0]
  ).toEqual("0x1");

  //   Extract all addresses from a string
  expect(
    "0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC, 0x1::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>".match(
      TokenPairs.AddressRegex
    )
  ).toEqual([
    "0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948",
    "0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa",
    "0x1",
    "0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12",
  ]);
});

// AddressToLong
test("TokenPairs AddressToLong", () => {
  expect(TokenPairs.AddressToLong("0x1")).toEqual(
    "0x0000000000000000000000000000000000000000000000000000000000000001"
  );

  expect(TokenPairs.AddressToLong("0x1::aptos_coin::AptosCoin")).toEqual(
    "0x0000000000000000000000000000000000000000000000000000000000000001::aptos_coin::AptosCoin"
  );

  //   Pad with zeros to first address and 0x1
  expect(
    TokenPairs.AddressToLong(
      "0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC, 0x1::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>"
    )
  ).toEqual(
    "0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC, 0x0000000000000000000000000000000000000000000000000000000000000001::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>"
  );
});

test("TokenPairs AssetTypeEq", () => {
  expect(
    TokenPairs.AssetTypeEq(
      "0x1::aptos_coin::AptosCoin",
      "0x0000000000000000000000000000000000000000000000000000000000000001::aptos_coin::AptosCoin"
    )
  ).toEqual(true);

  expect(
    TokenPairs.AssetTypeEq(
      "0x5a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC, 0x1::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>",
      "0x05a97986a9d031c4567e15b797be516910cfcb4156312482efc6a19c0a30c948::lp_coin::LP<0xf22bede237a07e121b56d91a491eb7bcdfd1f5907926a9e58338f964a01b17fa::asset::USDC, 0x0000000000000000000000000000000000000000000000000000000000000001::aptos_coin::AptosCoin, 0x190d44266241744264b964a37b8f09863167a12d3e70cda39376cfb4e3561e12::curves::Uncorrelated>"
    )
  ).toEqual(true);
});

describe("TokenPairTypeCheck", () => {
  const payloads = ["payload0", "payload1", "payload2", "payload3"];

  test("should return payload0 when both tokens are 'fa'", () => {
    expect(TokenPairs.TokenPairTypeCheck(["0xa", "0xa"], payloads)).to.equal(
      "payload0"
    );
  });

  test("should return payload1 when both tokens are 'coin'", () => {
    expect(
      TokenPairs.TokenPairTypeCheck(
        ["0x1::aptos_coin::AptosCoi", "0x1::aptos_coin::AptosCoi"],
        payloads
      )
    ).to.equal("payload1");
  });

  test("should return payload2 when the first token is 'coin' and the second is 'fa'", () => {
    expect(
      TokenPairs.TokenPairTypeCheck(
        ["0x1::aptos_coin::AptosCoi", "0xa"],
        payloads
      )
    ).to.equal("payload2");
  });

  test("should return payload3 when the first token is 'fa' and the second is 'coin'", () => {
    expect(
      TokenPairs.TokenPairTypeCheck(
        ["0xa", "0x1::aptos_coin::AptosCoi"],
        payloads
      )
    ).to.equal("payload3");
  });
});
