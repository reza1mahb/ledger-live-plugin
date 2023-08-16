import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx, nano_models,SPECULOS_ADDRESS, txFromEtherscan} from './test.fixture';
import { ethers } from "ethers";
import { parseEther, parseUnits} from "ethers/lib/utils";

// PancakeRouter
const pluginName = "venus";
const testName = 'pancakerouter'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x17f4a746a7bf05c3e24a2bb7d7d25e4d3e5bbe3e"; // PancakeRouter
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// Required for testing

const amountOut = parseUnits("1234515195959303600", 'wei');
const amountIn =  parseUnits("28471151959593036000", 'wei');

const XVS = "0xcf6bb5389c92bdda8a3747ddb454cb7a64626c63";
const WBNB = "0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c";
const USDT = "0x55d398326f99059ff775485246999027b3197955";
const BUSD = "0xe9e7cea3dedca5984780bafc599bd69add087d56";

const deadline = Number(1632843280);
// We set beneficiary to the default address of the emulator, so it maches sender address
const beneficiary = SPECULOS_ADDRESS;

// The tests for each method are in its own function
testSwapExactTokensForTokens();
testSwapExactETHForTokens();
testSwapExactTokensForETH();
testSwapTokensForExactTokens();
testSwapETHForExactTokens();
testSwapTokensForExactETH();

//Example at:
//https://bscscan.com/tx/0xe771a22d5d53fc83d5453b03465bb635637cb43c91c587b4746ad5cff15c8c9d

function testSwapExactTokensForTokens() {
  const method = "swapExactTokensForTokens";
  // Test from constructed transaction
  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
      const path = [USDT, XVS, BUSD];
      const {data} = await contract.populateTransaction.swapExactTokensForTokens(amountIn, amountOut, path, beneficiary ,deadline);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = parseEther("0");

      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );
      const right_clicks = model.letter === 'S' ? 8 : 6;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
  });
}

// Example transaction at:
// https://bscscan.com/tx/0x207fdea2bbfe915a401e0c5c6172e5449b6e0bc93385fd0bf11b1f3d56b810e8

function testSwapExactETHForTokens() {
  const method = "swapExactETHForTokens";
  // Test from constructed transaction
  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
      const path = [WBNB, USDT];
      const {data} = await contract.populateTransaction.swapExactETHForTokens(amountIn, path, beneficiary ,deadline);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = amountOut;


      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );
      const right_clicks = model.letter === 'S' ? 8 : 6;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
  });
}

// Example at:
// https://bscscan.com/tx/0x33a1b0ad9b88d74266211d4454386c1d173dbb68d09c02dc72ae84c5800cef9b

function testSwapExactTokensForETH() {
  const method = "swapExactTokensForETH";
  // Test from constructed transaction
  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
      const path = [BUSD, WBNB];
      const {data} = await contract.populateTransaction.swapExactTokensForETH(amountIn, amountOut, path, beneficiary ,deadline);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = parseEther("0");

      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );
      const right_clicks = model.letter === 'S' ? 8 : 6;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
  });
}

// Example:
// https://bscscan.com/tx/0xd112c222901d139d5467ae156fec637a842602c38235da582eb4f2636d59b606

function testSwapTokensForExactTokens() {
  const method = "swapTokensForExactTokens";
  // Test from constructed transaction
  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
      const path = [BUSD, WBNB, USDT];
      const {data} = await contract.populateTransaction.swapTokensForExactTokens(amountOut, amountIn, path, beneficiary ,deadline);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = parseEther("0");

      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );
      const right_clicks = model.letter === 'S' ? 8 : 6;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
  });
}

// Example: https://bscscan.com/tx/0xdce10f6ec9e3b5c2fedcfdbf23c462f290c455a65bd72326fd0052138df81641

function testSwapETHForExactTokens() {
  const method = "swapETHForExactTokens";
  // Test from constructed transaction
  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
      const path = [WBNB, XVS];
      const {data} = await contract.populateTransaction.swapETHForExactTokens(amountIn, path, beneficiary ,deadline);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = amountOut;

      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );
      const right_clicks = model.letter === 'S' ? 8 : 6;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
  });
}

// https://bscscan.com/tx/0x928f2316ebb5bb14c1a2d48fd6ac5a76efe3108b468b312c7e48dc9b5cfac027

function testSwapTokensForExactETH() {
  const method = "swapTokensForExactETH";
  // Test from constructed transaction
  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
      const path = [BUSD, WBNB];
      const {data} = await contract.populateTransaction.swapTokensForExactETH(amountOut, amountIn, path, beneficiary ,deadline);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = parseEther("0");

      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );
      const right_clicks = model.letter === 'S' ? 8 : 6;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
  });
}
