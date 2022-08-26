// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import createSignatureFromServer from "../../lib/backend/createSignatureFromServer"


export default async function handler(req, res) {
  const { functionName, functionParameters } = req.body;
  
  const data = await createSignatureFromServer(functionName, functionParameters);
  res.status(200).json({ data })
}
