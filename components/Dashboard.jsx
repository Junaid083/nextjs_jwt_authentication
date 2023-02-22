import React from "react";

import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();

  const logOut = () => {
    console.log("Clicked");
    Cookies.remove("Adminloggedin");

    router.push("/");
  };
  return (
    <>

      <div class="col-sm-10 offset-sm-2">
      <h1>Welcome to Admin Dashboard</h1>
        <button type="submit" class="btn btn-primary" onClick={() => logOut()}>
          Log Out
        </button>
      </div>
    </>
  );
};

export default Dashboard;
