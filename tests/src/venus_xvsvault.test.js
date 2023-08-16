import {testInputDataTx, testParamsTx, testAmount1_18} from "./test_utils";

// XVSVaultProxy
const pluginName = "venus";
const testName = 'xvsvault'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x051100480289e704d20e9db4804837068f3f9204"; // XVSVaultProxy
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// The tests for each method are in its own function

const _rewardToken = "0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63"; // XVS
const _pid = 0;
const _amount = testAmount1_18;
const _delegatee = "0xc444949e0054A23c44Fc45789738bdF64aed2391";

testDeposit();
testRequestWithdrawal();
testExecuteWithdrawal();
testDelegate();

function testDeposit() {
    const method = "deposit";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0xd135cd89d14ca3e038f50fce6c3778412fe4bdd51d1349798e2a69b8fc5e907b

    const inputData = "0x0efe6a8b000000000000000000000000cf6bb5389c92bdda8a3747ddb454cb7a64626c63000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008bc7b7f80cf3856";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [_rewardToken, _pid, _amount], "0", 5, 5);
}

function testRequestWithdrawal() {
    const method = "requestWithdrawal";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x06e146f03f2d742bcf1604f7e82e71f5308e622c89a2329cc0183839b43fb716

    const inputData = "0x115b512f000000000000000000000000cf6bb5389c92bdda8a3747ddb454cb7a64626c630000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a055690d9db80000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [_rewardToken, _pid, _amount], "0", 5, 5);
}

function testExecuteWithdrawal() {
    const method = "executeWithdrawal";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x5d6b2c152b12dd5bdfbb76dede9cc66dd293754cc0ac4f14c3d9fb323509f8a1

    const inputData = "0x7ac92456000000000000000000000000cf6bb5389c92bdda8a3747ddb454cb7a64626c630000000000000000000000000000000000000000000000000000000000000000";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 5, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [_rewardToken, _pid], "0", 5, 5);
}

function testDelegate() {
    const method = "delegate";

    // testInputDataTx
    // Build our test transaction using InputData from previous transaction
    // https://bscscan.com/tx/0x1f3ddec6292a7f7efeffe5a73b82b326fb49a257c0eec9649cac1f2cf4a9c355

    const inputData = "0x5c19a95c000000000000000000000000c444949e0054a23c44fc45789738bdf64aed2391";

    testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, "0", 7, 5);

    // testParamsTx
    // Build our test transaction using params

    testParamsTx(testName, chainId, contractAddr, abi, method, [_delegatee], "0", 7, 5);
}
