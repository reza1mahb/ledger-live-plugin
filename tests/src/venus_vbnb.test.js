import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// VBNB - Venus vBNB

const pluginName = "venus";
const testName = 'vbnb'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0xa07c5b74c9b40447a954e1466938b865b6bbea36"; //  vBNB
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testMint();
testRedeemUnderlying();
testRedeem();   // note - the only amount we have is the amount of vtokens being redeemed - 
                // currently using local lookup to display underlying symbol so displays amount of vtokens to 18 decimals not 8
                // so redeem 122,551 vUSDT (equivalent to 2,772 USDT after the transactions executes) shows as USDT 0.0000122551
                // all we can do is show vUSDT 122,551
testBorrow();
testRepayBorrow();

function testMint() {
    const method = "mint";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xbe36af917088c4f07fe4c1912ab76f5e350c54bc4c53b56fe96993c97a8a93d1

    const inputData = "0x1249c58b";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "1.2345", 5, 5);

    // testParamsTx

    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [], "1.2345", 5, 5);
}


function testRedeemUnderlying() {
    const method = "redeemUnderlying";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x9aa76cb7f7355d61a75e74579eda747aba1fa335baf58a5194f7059ba4f31797

    const inputData = "0x852a12e30000000000000000000000000000000000000000000000000de0b6b3a7640000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const redeemAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [redeemAmount], "0", 5, 5);

}

function testRedeem() {
    const method = "redeem";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xbd02460cf8ced7fc32bc60cb53ab52289a84a47aa370a205db9c2eef9af13458

    const inputData = "0xdb006a7500000000000000000000000000000000000000000000000000000000d59fb789";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const redeemTokens = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [redeemTokens], "0", 5, 5);

}

function testBorrow() {
    const method = "borrow";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xb526840036a3f5ae3894bfb037d3310f7504e452933a2c67b71ace5400b6202a

    const inputData = "0xc5ebeaec0000000000000000000000000000000000000000000000008ac7230489e80000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const borrowAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [borrowAmount], "0", 5, 5);

}

function testRepayBorrow() {
    const method = "repayBorrow";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xfd0bb9b9f9a7255a3993dc55161e740808af4a31461990debe83988cad284492

    const inputData = "0x4e4d9fea";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "1.2345", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [], "1.2345", 5, 5);

}