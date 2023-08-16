import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// VAIUnitroller
const pluginName = "venus";
const testName = 'vaiunitroller'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x004065d34c6b18ce4370ced1cebde94865dbfafe"; // VAIUnitroller
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testMintVAI();
testRepayVAI();

function testMintVAI() {
    const method = "mintVAI";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x911ecce8b9355ec0c6ef65737c9a01e8a8ea6b1a4f7207f3fbb84f537c5e9f8b

    const inputData = "0x4712ee7d0000000000000000000000000000000000000000000000052c0f2ff550b3e30b";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const mintVAIAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [mintVAIAmount], "0", 5, 5);
}

function testRepayVAI() {
    const method = "repayVAI";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x4e5a3e63138d300b97c3443c936b0cb984f171391a34c952cfb82e6088a1a362

    const inputData = "0x6fe74a2100000000000000000000000000000000000000000000000000036c6ed4fc20c2";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const repayVAIAmount = testAmount1_18; 

    testParamsTx(testName, chainId, contractAddr, abi, method, [repayVAIAmount], "0", 5, 5);
}

