import jwt from "jsonwebtoken";

const KEY = "junaidjunaid";

export default function (req, res) {
  const token = req.body;

  const { admin } = jwt.verify(token, KEY);
  if (admin) {
    res.json({ secretAdminCode: "Welcome You are Admin" });
  } else {
    res.json({ admin: false });
  }
}