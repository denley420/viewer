import { useEffect, useState } from "react";
import FunctionCard from "../components/functionCard";
import web3 from "../lib/web3/web3";


export default function ViewContract({ contract, contractABI, address }) {
  useEffect(() => {
    setFunctions(contractABI.abi);
    setName(contractABI.contractName);
    setCAddress(address);
  }, []);

  const [name, setName] = useState("");
  const [caddress, setCAddress] = useState("");
  const [functions, setFunctions] = useState([]);

  function search(e) {
    const searchTerm = e.target.value;
    const filteredFunctions = contractABI.abi.filter((f) => {
      return f.name && f.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFunctions(filteredFunctions);
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <h2 className="text-xl font-bold text-center mt-8">{name}</h2>
      <h3 className="font-bold text-center mb-8">{caddress}</h3>
      <input type="text" className="border border-gray-300 shadow-md p-2 w-full mb-2" placeholder="Search Function" onChange={search}/>
      <br/>
      <div className="grid gap-1 grid-cols-1 md:grid-cols-2">
        {functions
          .map((e, index) => {
            if (e.type === "function") {
              return <FunctionCard key={index} data={e} contract={contract} />;
            }
          })
          .filter((e) => e)}
      </div>
    </div>
  );
}