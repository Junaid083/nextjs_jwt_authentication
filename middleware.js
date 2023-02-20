import { NextResponse } from "next/server";

export default function middleware(req) {
  let adminverify = req.cookies.get("Adminloggedin");
  let userVerify = req.cookies.get("Userloggedin");
  console.log("Admin Verify", req.url);
  let url = req.url;

  if (!adminverify && url.includes("/admin/dashboard")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (adminverify && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/admin/dashboard");
  }

  if (!userVerify && url.includes("/user/dashboard")) {
    return NextResponse.redirect("http://localhost:3000/");
  }

  if (userVerify && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000//user/dashboard");
  }
}
