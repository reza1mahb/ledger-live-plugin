import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// Unitroller
const pluginName = "venus";
const testName = 'unitroller'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0xfd36e2c2a6789db23113685031d7f16329158384"; // Unitroller
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

testEnterMarkets();
testExitMarket();

function testEnterMarkets() {
    const method = "enterMarkets";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xf297cbcebc9053f350042362980f3d9eb911dedfb02de7110ce48ce33b131cdc

    const inputData = "0xc299823800000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a07c5b74c9b40447a954e1466938b865b6bbea36";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const vTokens = ["0xfd5840cd36d94d7229439859c0112a4185bc0255"]; // vUSDT

    testParamsTx(testName, chainId, contractAddr, abi, method, [vTokens], "0", 5, 5);
}

function testExitMarket() {
    const method = "exitMarket";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x39df512c42aa98e7771ee23c9500b6ee0dce67ba8bd183adf0a53db72ad40e21

    const inputData = "0xede4edd0000000000000000000000000fd5840cd36d94d7229439859c0112a4185bc0255";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    const vTokenAddress = "0xfd5840cd36d94d7229439859c0112a4185bc0255"; // vUSDT

    testParamsTx(testName, chainId, contractAddr, abi, method, [vTokenAddress], "0", 5, 5);
}

