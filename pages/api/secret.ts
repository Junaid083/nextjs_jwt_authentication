import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next'

const KEY = "junaidjunaid";

export default function (req:NextApiRequest, res: NextApiResponse) {
  const token = req.body;

  const { admin } = jwt.verify(token, KEY) as {[key:string]:string}
  if (admin) {
    res.json({ secretAdminCode: "Welcome You are Admin" });
  } else {
    res.json({ admin: false });
  }
}
