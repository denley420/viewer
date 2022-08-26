import Layout_Dev from "../../components/layoutDev";
import ViewContract from "../../layouts/viewContract";
import { contract, ABI, CONTRACT_ADDRESS } from "../../lib/web3/xtoken_raffle";

export default function XTokenCore() {
  return (
    <Layout_Dev>
      <ViewContract
        contract={contract}
        address={CONTRACT_ADDRESS}
        contractABI={ABI}
      />
    </Layout_Dev>
  );
}
