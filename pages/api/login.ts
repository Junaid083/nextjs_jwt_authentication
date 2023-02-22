import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from 'next'

const KEY = "junaidjunaid";

export default function (req : NextApiRequest , res: NextApiResponse) {
  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { username, password } = req.body;

  res.json({
    token: jwt.sign(
      {
        username,
        admin: username === "admin@admin.com" && password === "admin",
      },
      KEY
    ),
  });
}
