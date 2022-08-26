import Web3 from "web3";
 
let web3;
 
if (typeof window !== "undefined") {
  if ( typeof window.ethereum !== "undefined" ) {
    // We are in the browser and metamask is running.
    try{
      window.ethereum.request({ method: "eth_requestAccounts" });
    } catch(e) {
      console.log(e);
    }
    web3 = new Web3(window.ethereum);
  }
  else {
    // the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
      `https://rinkeby.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_KEY}`
    );
    web3 = new Web3(provider);
    
  }
} else {
  // We are on the server
  const provider = new Web3.providers.HttpProvider(
    `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`
  );
  web3 = new Web3(provider);
}
 
export default web3;