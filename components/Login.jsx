import React from 'react'
import { useState } from "react";
import jwt from "jsonwebtoken";

const Login = () => {
  const defaultValue = {
    username: "",
    password: "",
  };
  const [data, setData] = useState(defaultValue);
  const [message, setMessage] = useState("You are not logged in");
  const [secret, setSecret] = useState("");

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
      setMessage(
        `Welcome ${json.username} and you are ${
          json.admin ? "an admin ! " : "not an admin"
        }`
      );
       
      const res = await fetch("/api/secret", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      }).then((t) => t.json());


      if(res.secretAdminCode){
        setSecret( res.secretAdminCode)
      }
      else{
        setSecret( "")
      }

    } else {
      setMessage("Something went wrong");
    }
  };

  return (
    <>
      {/* <h1>{message}</h1> */}
      <h1>{secret}</h1>
      <form>
        <input
          name="username"
          type="text"
          value={data.username}
          onChange={handleInputs}
        ></input>
        <br></br>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleInputs}
        ></input>
        <br></br>
        <input
          type="submit"
          value="Login"
          onClick={(e) => {
            submitForm(e);
          }}
        ></input>
      </form>
    </>
  )
}

export default Login
