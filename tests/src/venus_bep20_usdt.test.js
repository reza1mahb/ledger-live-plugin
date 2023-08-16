import {testInputDataTx, testParamsTx, testAmount1_Wei} from "./test_utils";

// BEP20 approve - using Binance USDT
const pluginName = "venus";
const testName = 'bep20_usdt'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x55d398326f99059ff775485246999027b3197955"; // Binance USDT
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testApprove();

function testApprove() {
    const method = "approve";

    // *** testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x7c8b5b198bde4542d4ac6404d8013bd4b5b58916a28c3b2c9c6cd374cab27c30

    const inputData = "0x095ea7b3000000000000000000000000fd5840cd36d94d7229439859c0112a4185bc0255ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // *** testParamsTx
    // Build our test transaction using params
    
    const amount = testAmount1_Wei;
    const spender = "0xfd5840cd36d94d7229439859c0112a4185bc0255";  // Venus vUSDT

    testParamsTx(testName, chainId, contractAddr, abi, method, [spender, amount], "0", 5, 5);

}