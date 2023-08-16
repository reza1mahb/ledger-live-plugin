import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// VRTVaultProxy
const pluginName = "venus";
const testName = 'vrtvault'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x98bf4786d72aaef6c714425126dd92f149e3f334"; // VRTVaultProxy
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testDeposit();
testWithdraw();
testClaim();

function testDeposit() {
    const method = "deposit";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xba1508999df05ffe7f254f461084ab8913bffc4abd60a414e29e4d0e2cfb8497

    const inputData = "0xb6b55f2500000000000000000000000000000000000000000000006ec76c4339ef4c9e8a";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const depositAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [depositAmount], "0", 5, 5);
}

function testWithdraw() {
    const method = "withdraw";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x40f560bb6a20175fb3b696b0bc2830b885ea1b2447e012b0cb5525d56270d866

    const inputData = "0x3ccfd60b";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params


    testParamsTx(testName, chainId, contractAddr, abi, method, [], "0", 5, 5);
}

function testClaim() {
    const method = "claim";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x32d55ed671395c86d684ff5a4ec03a11ef52d7e2643f70c631249e7494c76a9c

    const inputData = "0x4e71d92d";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [], "0", 5, 5);
}

