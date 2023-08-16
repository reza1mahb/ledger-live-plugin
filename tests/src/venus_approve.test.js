import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx, nano_models,SPECULOS_ADDRESS, txFromEtherscan} from './test.fixture';
import { ethers } from "ethers";
import { parseEther, parseUnits} from "ethers/lib/utils";

// vToken Mint
const pluginName = "venus";
const testName = 'vusdt'; // name of this test script used to genertate snapshot folder name

const chainId = 56; //bnb-mainnet
const contractAddr = "0x55d398326f99059ff775485246999027b3197955"; // USDT
const testNetwork = "bnb-mainnet";
const abi_path = `../networks/${testNetwork}/${pluginName}/abis/` + contractAddr + '.json';
const abi = require(abi_path);

// Required for testing

const amount = parseUnits("1234560000000000000", 'wei');
const spender = "0xfd5840cd36d94d7229439859c0112a4185bc0255";  // Venus vUSDT

const method = "approve";
// Test from constructed transaction
nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);

      const {data} = await contract.populateTransaction.approve(spender, amount);

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
      const right_clicks = model.letter === 'S' ? 5 : 5;
      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
      // EDIT THIS: modify `10` to fix the number of screens you are expecting to navigate through.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName, [right_clicks, 0]);
      await tx;
    }));
});
