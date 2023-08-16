import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// VBep20Delegator - vUSDT
const pluginName = "venus";
const testName = 'vtoken_vusdt'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0xfd5840cd36d94d7229439859c0112a4185bc0255"; //  vUSDT
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
    // https://bscscan.com/tx/0x799643a9aa281fc17e6958a82d6a66a2bfa72b5d95067f511c2a5054e87d7de8

    const inputData = "0xa0712d680000000000000000000000000000000000000000000008d178b7b9ee17cc0000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx

    // Build our test transaction using params

    const amount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [amount], "0", 5, 5);
}


function testRedeemUnderlying() {
    const method = "redeemUnderlying";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xa04cbb4236d9d70d8d5b837bcc94643cb3d2172f90ce80eaf0c1978c38be5789

    const inputData = "0x852a12e300000000000000000000000000000000000000000000055c50ac904a1ec2a9a6";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const redeemAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [redeemAmount], "0", 5, 5);

}

function testRedeem() {
    const method = "redeem";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xa371acc52b6ba3c208494aa3bcde82bc6d45f41bb4722fbf8f8f9f275cd2cee6

    const inputData = "0xdb006a7500000000000000000000000000000000000000000000000000000b255de89c76";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 6, 5);

    // testParamsTx
    // Build our test transaction using params

    const redeemTokens = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [redeemTokens], "0", 5, 5);

}

function testBorrow() {
    const method = "borrow";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xcc4553e47723a21ec6002f3793143e5c9519394543332955996924427bb8d00d

    const inputData = "0xc5ebeaec0000000000000000000000000000000000000000000000a2a15d09519be00000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const borrowAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [borrowAmount], "0", 5, 5);

}

function testRepayBorrow() {
    const method = "repayBorrow";

    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x1582af80bb4d8350c1be652b570b8cb9a47d931edc8210d6b144f96419399c73

    const inputData = "0x0e7527020000000000000000000000000000000000000000000000733a5ff88f46b80650";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const repayAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [repayAmount], "0", 5, 5);

}