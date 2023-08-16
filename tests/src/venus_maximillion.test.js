import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// Maximillion
const pluginName = "venus";
const testName = 'maximillion'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x5efa1e46f4fd738ff721f5aebc895b970f13e8a1"; // Maximillion

const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testRepayBehalfExplicit();

function testRepayBehalfExplicit() {
    const method = "repayBehalfExplicit";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xa764a059e9f2f139f24205f178b8817bd6c671e65f0a0671e424a350b1f334af

    const inputData = "0x367b7f05000000000000000000000000d116e519afc16dc3fe4333c7dd6a936584703446000000000000000000000000a07c5b74c9b40447a954e1466938b865b6bbea36";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "90.560565355680", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const amount = testAmount1_18;
    const borrower = "0xFE984369CE3919AA7BB4F431082D027B4F8ED70C"; // SPECULOUS ADDRESS
    const vBnb_ = "0xA07c5b74C9B40447a954e1466938b865b6BBea36"; // vBNB address

    testParamsTx(testName, chainId, contractAddr, abi, method, [borrower, vBnb_], "1.2345", 5, 5);
}


