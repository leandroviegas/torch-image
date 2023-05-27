import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      break;
    case 'GET':
      break;
    default:
  }
  res.status(200).json({});
}