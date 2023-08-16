## Requirements for running the tests

### Binaries

The tests run using both the plugin elf and the ethereum elf, both compiled for
NanoS and X, so 4 binaries are needed. They are expected to be stored in the
`tests/elfs/` directory, and named as follow:

* `tests/elfs/plugin_nanos.elf`
* `tests/elfs/plugin_nanox.elf`
* `tests/elfs/ethereum_nanos.elf`
* `tests/elfs/ethereum_nanox.elf`

The `tests/build_local_test_elfs.sh` can be used to generate these binaries.

To use this script, you will need the
[Ethereum application](https://github.com/LedgerHQ/app-ethereum) to be cloned
somewhere, and the path of its repository exported in the `APP_ETHEREUM`
environment variable, or updated in the script, or as an argument of the script.

The script using relative paths, it must be launched from the `tests` directory:

```bash
cd tests
./build_local_test_elfs.sh
```

### Other dependencies

The tests run using the [Zemu framework](https://github.com/Zondax/zemu),
so the `yarn` manager is needed.

The JavaScript dependencies are then installed with:

```bash
cd tests
yarn install
```

## Launching the tests

```bash
cd tests
yarn test
```


## About the ClearSign Test Suite

Due to the relatively high number of selectors (30+) and number of contracts(12+) covered by the ClearSign Plugin for the Venus Protocol, we grouped selectors by contract and created a test program for each contract

Therefore each test program may contain several selectors and a single selector may appear in more than one test program if it applies to more than one contract.

In addition, each selector is tested twice, once using inputdata from a read previous transaction on the blockchain, and another by manual input of parameters.


# For Contract/Selector Mapping please see b2c.json file

# For Selector/Test program mapping


| Selector Name  (from contracts.c)    | Smart Contract         | Test Suite Name |
| ------------------------------------ | ---------------------- | --------------- |
| BEP20_APPROVE_SELECTOR               | Any BEP20 Token        | bep20_usdt      |
| VENUS_MINT_BNB_SELECTOR              | VBNB                   | vbnb            |
| VENUS_MINT_SELECTOR                  | Any vToken             | vtoken_vusdt    |
| VENUS_REDEEM_UNDERLYING_SELECTOR     | Any vToken             | vtoken_vusdt    |
|       "           "                  | VBNB                   | vbnb            |
| VENUS_REDEEM_SELECTOR                | Any vToken             | vtoken_vusdt    |
|       "           "                  | VBNB                   | vbnb            |
| VENUS_BORRON_SELECTOR                | Any vToken             | vtoken_vusdt    |
|       "           "                  | VBNB                   | vbnb            |
| VENUS_REPAY_BORROW_SELECTOR          | Any vToken             | vtoken_vusdt    |
| VENUS_REPAY_BORROW_BNB_SELECTOR      | VBNB                   | vbnb            |
|                                      |                        |                 |
| VENUS_REPAY_BORROW_ON_BEHALF_SELECTOR| Maximillion            | maximillion     |
|                                      |                        |                 |
| VENUS_PROVIDE_COLLATERAL_SELECTOR    | Unitroller             | unitroller      |
| VENUS_REMOVE_COLLATERAL_SELECTOR     | Unitroller             | unitroller      |
|                                      |                        |                 |
| VAULT_DEPOSIT_SELECTOR               | VAIVaultProxy          | vaivault        |
|       "            "                 | VRTVaultProxy          | vrtvault        |
| VAULT_DEPOSIT_TOKEN_SELECTOR         | XVSVaultProxy          | xvsvault        |
| VAULT_WITHDRAW_VAI_SELECTOR          | VAIVaultProxy          | vaivault        |
| VAULT_WITHDRAW_VRTXVS_SELECTOR       | VRTVaultProxy          | vaivault        |
|       "            "                 | XVSVestingProxy        | xvsvesting      |
| VAULT_WITHDRAW_TOKEN_REQUEST_SELECTOR| XVSVaultProxy          | xvsvault        |
| VAULT_WITHDRAW_TOKEN_EXECUTE_SELECTOR| XVSVaultProxy          | xvsvault        |
| VAULT_CLAIM_SELECTOR                 | VAIVaultProxy          | vaivault        |
|       "            "                 | VRTVaultProxy          | vrtvault        |
| VENUS_DELEGATE_VOTE_SELECTOR         | XVSVaultProxy          | xvsvault        |
|                                      |                        |                 |
| VENUS_MAKE_PROPOSAL_SELECTOR         | GovernorBravoDelegator | governor        |
| VENUS_CAST_VOTE_SELECTOR             | GovernorBravoDelegator | governor        |
| VENUS_VOTE_WITH_REASON_SELECTOR      | GovernorBravoDelegator | governor        |
|                                      |                        |                 |
| VENUS_CONVERT_VRT_SELECTOR           | VRTConverterProxy      | vrtconvert      |
|                                      |                        |                 |
| SWAP_EXACT_TOKENS_FOR_TOKENS_SELECTOR| PancakeRouter          | pancakerouter   |
| SWAP_EXACT_ETH_FOR_TOKENS_SELECTOR   | PancakeRouter          | pancakerouter   |
| SWAP_EXACT_TOKENS_FOR_ETH_SELECTOR   | PancakeRouter          | pancakerouter   |
| SWAP_TOKENS_FOR_EXACT_TOKENS_SELECTOR| PancakeRouter          | pancakerouter   |
| SWAP_ETH_FOR_EXACT_TOKENS_SELECTOR   | PancakeRouter          | pancakerouter   |
| SWAP_TOKENS_FOR_EXACT_ETH_SELECTOR   | PancakeRouter          | pancakerouter   |
|                                      |                        |                 |
| VENUS_MINT_VAI_SELECTOR              | VAIUnitroller          | vaiunitroller   |
| VENUS_REPAY_VAI_SELECTOR             | VAIUnitroller          | vaiunitroller   |


## Smart Contracts

Venus Protocol smart contracts on the Bnb Smart Chain covered by this plugin are:

| Contract Name          | Smart Contract                               |
| ---------------------- | -------------------------------------------- |
| VBNB                   | `0xa07c5b74c9b40447a954e1466938b865b6bbea36` |
| Maximillion            | `0x5efa1e46f4fd738ff721f5aebc895b970f13e8a1` |
| Unitroller             | `0xfd36e2c2a6789db23113685031d7f16329158384` |
| VAIVaultProxy          | `0x0667eed0a0aab930af74a3dfedd263a73994f216` |
| VRTVaultProxy          | `0x98bf4786d72aaef6c714425126dd92f149e3f334` |
| XVSVaultProxy          | `0x051100480289e704d20e9db4804837068f3f9204` |
| GovernorBravoDelegator | `0x2d56dc077072b53571b8252008c60e945108c75a` |
| VRTConverterProxy      | `0x92572fb60f4874d37917c53599cae5b085b9facd` |
| XVSVestingProxy        | `0xb28dec7c7ac80f4d0b6a1b711c39e444cde8b2ce` |
| PancakeRouter          | `0x17f4a746a7bf05c3e24a2bb7d7d25e4d3e5bbe3e` |
| VAIUnitroller          | `0x004065d34c6b18ce4370ced1cebde94865dbfafe` |


This plugin also covers Venus vTokens contracts created from the principle vBep20Delegator contract including:

| vToken                 | Smart Contract                               |
| ---------------------- | -------------------------------------------- |
| vUSDT                  | `0xfd5840cd36d94d7229439859c0112a4185bc0255` |


And offers approval of the Bep20 tokens contracts underlying each Venus vTokens:

| Bep20 Token            | Smart Contract                               |
| ---------------------- | -------------------------------------------- |
| Binance USDT           | `0x55d398326f99059ff775485246999027b3197955` |



