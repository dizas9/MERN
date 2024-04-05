import axios from "axios";
import React, { useState } from "react";
import { API_URL, PROD_URL } from "../../API";

import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  //states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState(false);

  const navigate = useNavigate();

  const { email, password } = formData;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //header configuration
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(formData);

      const res = await axios.post(`${API_URL}/api/user/login`, body, config);

      if (res.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrMsg(error.response.data.message);
      } else {
        console.error(error.response);
      }
    }
  }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "0.5rem",
        }}
        onSubmit={handleSubmit}
      >
        <h2>Log In</h2>
        {errMsg ? <p>{errMsg}</p> : ""}
        <label htmlFor="email">Email1</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            setFormData({ ...setFormData, [e.target.name]: e.target.value });
          }}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
          }}
        />

        <button type="submit">Log In</button>
        <Link to={"/"}>Not a Member? Register</Link>
      </form>
    </div>
  );
}
