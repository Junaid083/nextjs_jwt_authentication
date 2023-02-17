import jwt from "jsonwebtoken";

const KEY = "junaidjunaid";

export default function (req, res) {
  const token  = req.body;
 
  const { admin } = jwt.verify(token, KEY);
  if (admin) {
    res.json({ secretAdminCode: 1234 });
  } else {
    res.json({ admin: false });
  }
}
