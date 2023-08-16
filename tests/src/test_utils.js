import "core-js/stable";
import "regenerator-runtime/runtime";
import { waitForAppScreen, zemu, genericTx, nano_models,SPECULOS_ADDRESS, txFromEtherscan} from './test.fixture';
import { ethers } from "ethers";
import { parseEther, parseUnits} from "ethers/lib/utils";

// Some useful numbers
export const testAmount1_18 = parseUnits("1.2345", '18');
export const testAmount1_6 = parseUnits("1.2345", '6');
export const testAmount1_Wei = parseUnits("28471151959593036279", 'wei');

// *** Test from replayed ETHERSCAN transaction - NOT available on BNB or POLYGON
// Please note ONLY ETHERSCAN provides rawTx data using https:/etherscan.io/getRawTx?tx=
export function testRawTx(testName, method, rawTx, screensNanoS = 12, screensNanoX = 6) {
  nano_models.forEach(function(model) {
    test('[Nano ' + model.letter + ']' + method + ' RawTx', zemu(model, async (sim, eth) => {

      const serializedTx = txFromEtherscan(rawTx);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx,
      );

      const right_clicks = model.letter === 'S' ? screensNanoS : screensNanoX;

      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);

      // Navigate the display by pressing the right button `right_clicks` times, then pressing both buttons to accept the transaction.
      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName + ' _rawtx', [right_clicks, 0]);

      await tx;
    }));
  });
}

// ** Test transaction using inputData - Simplest way to test - just copy HEX value of Input Data field on bscscan from an existing transaction

export function testInputDataTx(testName, chainId, contractAddr, abi, method, inputData, value = "0.0", screensNanoS = 12, screensNanoX = 7) {
    nano_models.forEach(function(model) {
        jest.setTimeout(20000)
        test('[Nano ' + model.letter + '] ' + method, zemu(model, async (sim, eth) => {
        const contract = new ethers.Contract(contractAddr, abi);
                  
        // Get the generic transaction template
        let unsignedTx = genericTx;
        //adapt to the appropriate network
        unsignedTx.chainId = chainId;
        // Modify `to` to make it interact with the contract
        unsignedTx.to = contractAddr;
        // Modify the attached data
        unsignedTx.data = inputData;
        // Modify the number of ETH sent
        unsignedTx.value = parseEther(value);
      
        // Create serializedTx and remove the "0x" prefix
        const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);
      
        const tx = eth.signTransaction(
          "44'/60'/0'/0",
          serializedTx
        );
      
        const right_clicks = model.letter === 'S' ? screensNanoS : screensNanoX;
      
        // Wait for the application to actually load and parse the transaction
        await waitForAppScreen(sim);
        // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.
        
        await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName + '_inputdata', [right_clicks, 0]);
      
        await tx;
        }));
      });
}


// *** Test from manually constructed transaction - pass the params - must be in the correct order

export function testParamsTx(testName, chainId, contractAddr, abi, method, params=[], value = "0.0", screensNanoS = 12, screensNanoX = 7) {

  nano_models.forEach(function(model) {
    jest.setTimeout(20000)
    test('[Nano ' + model.letter + '] ' +method, zemu(model, async (sim, eth) => {
      const contract = new ethers.Contract(contractAddr, abi);
  
      const {data} = await contract.populateTransaction[method](...params);

      // Get the generic transaction template
      let unsignedTx = genericTx;
      //adapt to the appropriate network
      unsignedTx.chainId = chainId;
      // Modify `to` to make it interact with the contract
      unsignedTx.to = contractAddr;
      // Modify the attached data
      unsignedTx.data = data;
      // EDIT THIS: get rid of this if you don't wish to modify the `value` field.
      // Modify the number of ETH sent
      unsignedTx.value = parseEther(value);

      // Create serializedTx and remove the "0x" prefix
      const serializedTx = ethers.utils.serializeTransaction(unsignedTx).slice(2);

      const tx = eth.signTransaction(
        "44'/60'/0'/0",
        serializedTx
      );

      const right_clicks = model.letter === 'S' ? screensNanoS : screensNanoX;

      // Wait for the application to actually load and parse the transaction
      await waitForAppScreen(sim);
      // Navigate the display by pressing the right button 10 times, then pressing both buttons to accept the transaction.

      await sim.navigateAndCompareSnapshots('.', model.name + '_' + method + '_' + testName + '_params', [right_clicks, 0]);

      await tx;
    }));
  });
}
