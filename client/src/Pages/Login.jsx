import axios from "axios";
import { useState } from "react";
import { API_URL, PROD_URL } from "../../API";

import { useNavigate, Link } from "react-router-dom";
import useIsAuth from "../hooks/AuthCheck";

export default function Login() {
  //states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState(false);

  const navigate = useNavigate();
  const { auth } = useIsAuth({ path: "/dashboard" });

  const { email, password } = formData;

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(`${PROD_URL}/api/user/login`, JSON.stringify(formData), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        navigate("/dashboard");
      }
    }).catch((err) => {
      console.log(err.response.data);
    })
  }

  return (
    <>
      {auth || <div>
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
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
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
      </div>}</>
  );
}