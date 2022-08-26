import web3 from "../web3/web3";
import xtoken from "../web3/xtoken";

// This function is meant to be called from server-side
async function createSignatureFromServer(functionName, functionParameters){
  
  const hostAddress = "0x4107F5Cf00BE8A68D34416daEd0F070894b1d91A";
  const hostPrivateKey =
    "0f48011361e5e719fd5dbde7763195b36e82526fb9bf62705344952fa25b3571";

  const target = xtoken.options.address;
  const nonce = await xtoken.methods.nonces(hostAddress).call();
  const action = await xtoken.methods[functionName](...functionParameters).encodeABI();
  const hash = web3.utils.sha3(
    target + action.substr(2) + web3.utils.toBN(nonce).toString(16, 64)
  );

  const { signature } = await web3.eth.accounts.sign(
    hash, 
    hostPrivateKey
  );
  
  // Return this as a json object
  return [hostAddress, target, action, nonce, signature];
}

export default createSignatureFromServer;