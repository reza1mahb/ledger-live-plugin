import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// VAIVaultProxy
const pluginName = "venus";
const testName = 'vaivault'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x0667eed0a0aab930af74a3dfedd263a73994f216"; // VAIVaultProxy
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
    // https://bscscan.com/tx/0x6f569ac6b04aaf5e87e4ce15d00dcf874adb5832d1eb4799f602f875bc7da05f

    const inputData = "0xb6b55f250000000000000000000000000000000000000000000000013467f4c1eb818000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const _amount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [_amount], "0", 5, 5);
}

function testWithdraw() {
    const method = "withdraw";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x2ae59b46963f549ab3807db992f60025952491ee187b508b14136e1a6ae6e02d

    const inputData = "0x2e1a7d4d000000000000000000000000000000000000000000000078921a9d3d4211d7a5";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const _amount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [_amount], "0", 5, 5);
}

function testClaim() {
    const method = "claim";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xcdd8c46dea08315be756b9e04bcfd34aa88d3f300198925a40401e8fa62dd673

    const inputData = "0x4e71d92d";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params


    testParamsTx(testName, chainId, contractAddr, abi, method, [], "0", 5, 5);
}

