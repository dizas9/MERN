import React, { useState } from "react";
import axios from "axios";
import { API_URL, PROD_URL } from "../../API";
import { useNavigate, Link } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [img, setImg] = useState("");
  const navigate = useNavigate();

  //destructure formData
  const { firstname, lastname, email, password } = formData;

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    //append file data
    const formDataSend = new FormData();

    formDataSend.append("firstname", formData.firstname);
    formDataSend.append("lastname", formData.lastname);
    formDataSend.append("email", formData.email);
    formDataSend.append("password", formData.password);
    formDataSend.append("image", formData.image);
    console.log("data: ", formDataSend);

    axios
      .post(`${API_URL}/api/user/register`, formDataSend)
      .then((response) => {
        if (response.status === 200) {
          setLoading(false);
          navigate("/login");
        }
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        console.error(error);
        setLoading(false);
      });
  }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          border: "1px solid",
          width: "60vh",
          height: "fit-content",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        {errorMsg ? <p>{errorMsg}</p> : ""}

        <label htmlFor="image"></label>
        <div
          style={{
            position: "relative",
            height: "10rem",
            width: "40%",
            borderRadius: "5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <img
            src={img}
            alt="Profile"
            style={{
              border: "1px solid",
              height: "10rem",
              width: "100%",
              borderRadius: "5rem",
            }}
          />
          <input
            type="file"
            name="image"
            accept="img/*"
            onChange={(e) => {
              const selectImage = e.target.files[0];
              const imgUrl = URL.createObjectURL(selectImage);
              setImg(imgUrl);
              setFormData({ ...formData, [e.target.name]: selectImage });
            }}
            style={{
              position: "absolute",
              bottom: "-18%",
              objectFit: "contain",
            }}
          />
        </div>

        <label htmlFor="firsname">Firstname</label>
        <input
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <button type="submit">SignUP</button>
        <Link to={"/login"}>Already a Member? Login</Link>
      </form>

      {loading ? <p>Loading....</p> : null}
    </div>
  );
}
