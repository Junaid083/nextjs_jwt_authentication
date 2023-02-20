import React from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const logOut = () => {
    console.log("Clicked");
    Cookies.remove("Adminloggedin");

    router.push("http://localhost:3000/");
  };
  return (
    <>
      <h1>Welcome to Admin Dashboard</h1>
      <button onClick={() => logOut()}>Logout</button>{" "}
    </>
  );
};

export default Dashboard;
