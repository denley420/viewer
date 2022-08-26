import web3 from "./web3";
import ABI from "./abi/XToken_Raffle.json";

const CONTRACT_ADDRESS = "0x9dA87c47B20F0823620df3A9093ad0E8b7d34C1c";

const contract = new web3.eth.Contract(
    ABI.abi,
    CONTRACT_ADDRESS
);

export {
    contract,
    ABI,
    CONTRACT_ADDRESS
};