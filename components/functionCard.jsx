import { ethers } from "ethers";
import { useState } from "react";
import web3 from "../lib/web3/web3";
import { waitTransactionToBeMined } from "../lib/web3/_wait";

export default function FunctionCard({ data, contract }) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const onCall = onCallDirect;

  async function onCallDirect(e) {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setResponse(null);
      const valuesToGet = data.inputs.map((e) => e.name);
      const values = valuesToGet.map((i, index) => {
        let k = i || `i_${data.name}_${index}`;
        return e.target[k].value;
      });

      try {
        const accounts = await web3.eth.getAccounts();

        let retValue;

        switch (data.stateMutability) {
          case "nonpayable":
            retValue = await contract.methods[data.name](...values).send({
              from: accounts[0],
            });
            break;
          case "payable":
            retValue = await contract.methods[data.name](...values).send({
              from: accounts[0],
              value: ethers.utils.parseEther(e.target["payable_amount"].value),
            });
            break;
          default:
            retValue = await contract.methods[data.name](...values).call({
              from: accounts[0],
            });
            break;
        }
        if (data.stateMutability === "view") {
        } else {
        }
        setResponse(retValue);
      } catch (e) {
        console.log(e);
        setResponse(e.message || "Error calling function");
      }
      setLoading(false);
    }
  }

  async function onCallPass(e) {
    e.preventDefault();
    if (!loading) {
      setLoading(true);
      setResponse(null);
      const valuesToGet = data.inputs.map((e) => e.name);
      const values = valuesToGet.map((i) => e.target[i].value);

      try {
        let signedDelegateCall;
        signedDelegateCall = await fetch("/api/test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            functionName: data.name,
            functionParameters: values,
          }),
        });
        signedDelegateCall = await signedDelegateCall.json();
        signedDelegateCall = signedDelegateCall.data;
        console.log(signedDelegateCall);
        // signedDelegateCall = await createSignatureFromClient(data.name, values);
        // console.log(signedDelegateCall);

        // =====================

        let retValue;

        const accounts = await web3.eth.getAccounts();
        retValue = await contract.methods
          .performFeelessTransaction(...signedDelegateCall)
          .send({ from: accounts[0] }, function (_, transactionHash) {
            console.log(transactionHash);
            setInterval(() => {
              console.log("checking if transaction is mined");
              web3.eth.getTransactionReceipt(transactionHash).then(console.log);
            }, 5000);
          });

        setResponse(retValue);
      } catch (e) {
        console.log(e);
        setResponse(e.message || "Error calling function");
      }
      setLoading(false);
    }
  }

  return (
    <div className="p-4 border shadow-md">
      <p>
        <strong>{data.name}</strong>
        {"  "}
        -&gt;{" "}
        {data.outputs &&
          data.outputs.map((output, index) => {
            return (
              <span key={index}>
                {output.type} {output.name}
              </span>
            );
          })}
      </p>
      <form onSubmit={onCall} className="grid gap-1">
        {data.inputs &&
          data.inputs.map((input, index) => {
            return (
              <div
                className="flex gap-1 items-center"
                key={`i_${data.name}_${index}`}
              >
                <span className="text-sm flex flex-1">
                  <span className="text-sm text-gray-500 mr-4">
                    {input.type}
                  </span>
                  {input.name}
                </span>
                <input
                  name={input.name || `i_${data.name}_${index}`}
                  className="border border-gray-500 flex-[2]"
                />
              </div>
            );
          })}
        {data.stateMutability === "payable" && (
          <div className="flex gap-1 items-center">
            <span className="text-sm flex flex-1">
              <span className="text-sm text-gray-500 mr-4">
                {data.stateMutability}
              </span>
              Value
            </span>
            <input
              name="payable_amount"
              className="border border-gray-500 flex-[2]"
            />
          </div>
        )}
        <button className="border border-blue-400 text-blue-600 p-1 ">
          Call
        </button>
      </form>
      {loading && <div className="text-center text-xs">Loading...</div>}
      {response && (
        <div className="text-center break-all text-sm">
          {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}
