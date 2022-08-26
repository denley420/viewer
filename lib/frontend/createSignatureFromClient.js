// This function is meant to be called from client-side

import web3 from "../web3/web3";
import xtoken from "../web3/xtoken";

export default async function createSignatureFromClient(functionName, functionParameters) {
  const accounts = await web3.eth.getAccounts();

  const hostAddress = accounts[0];

  const target = xtoken.options.address;
  const nonce = await xtoken.methods.nonces(hostAddress).call();
  const action = await xtoken.methods[functionName](
    ...functionParameters
  ).encodeABI();
  const hash = web3.utils.sha3(
    target + action.substr(2) + web3.utils.toBN(nonce).toString(16, 64)
  );

  const signature = await web3.eth.sign(
    web3.eth.accounts.hashMessage(hash),
    accounts[0]
  );

  // Return this as a json object
  return [hostAddress, target, action, nonce, signature];
}