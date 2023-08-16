import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// XVSVestingProxy
const pluginName = "venus";
const testName = 'xvsvesting'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0xb28dec7c7ac80f4d0b6a1b711c39e444cde8b2ce"; // XVSVestingProxy
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testWithdraw();

function testWithdraw() {
    const method = "withdraw";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xb88ca572002fe3613fd1d5d171e1fdfabde2acb5cd70cf32bcb0cd0233de71a3

    const inputData = "0x3ccfd60b";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [], "0", 5, 5);
}


