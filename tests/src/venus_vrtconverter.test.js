import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// VRTConverterProxy
const pluginName = "venus";
const testName = 'vrtconvert'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x92572fb60f4874d37917c53599cae5b085b9facd"; // VRTConverterProxy
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testConvert();

function testConvert() {
    const method = "convert";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xa88e0a72e36c28587717167db643979c686ceb7113dbd3f32046debb9a49da87

    const inputData = "0xa3908e1b000000000000000000000000000000000000000000000fe7dd0edd6d8c8a77e9";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    const vrtAmount = testAmount1_18;

    testParamsTx(testName, chainId, contractAddr, abi, method, [vrtAmount], "0", 5, 5);
}


