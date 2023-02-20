import React from "react";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Login = () => {
  const defaultValue = {
    username: "",
    password: "",
  };
  const [data, setData] = useState(defaultValue);
  const router = useRouter();
  const handleInputs = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((t) => t.json());

    const token = res.token;

    if (token) {
      const json = jwt.decode(token);
      console.log("JSON", json);

      const res = await fetch("/api/secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      }).then((t) => t.json());

      if (res.secretAdminCode) {
        Cookies.set("Adminloggedin", "true");
        router.push("/admin/dashboard");
      } else {
        Cookies.set("Userloggedin", "true");
        router.push("/user/dashboard");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <form>
          <div class="row mb-3">
            <label for="inputEmail" class="col-sm-2 col-form-label">
              Email
            </label>
            <div class="col-sm-10">
              <input
                class="form-control"
                name="username"
                type="text"
                value={data.username}
                onChange={handleInputs}
              ></input>
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword" class="col-sm-2 col-form-label">
              Pwd
            </label>
            <div class="col-sm-10">
              <input
                type="password"
                class="form-control"
                name="password"
                value={data.password}
                onChange={handleInputs}
              ></input>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-10 offset-sm-2">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={(e) => {
                  submitForm(e);
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
