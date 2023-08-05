import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "./ErrorMessage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignUp({ setSignUpUser }) {
  let color = "rgba(34, 105, 140)";
  const override = {
    display: "block",
    margin: "200px auto",
  };
  const history = useHistory();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordType, setPasswordtype] = useState("password");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const signUp = async () => {
    setLoading(true);
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded";
    await axios
      .post("http://localhost:5000/api/user/signUp", user)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.user) {
          setSignUpUser(res.data.user);
          setUser(res.data.user);
          window.localStorage.setItem("IsloggedIn", true);
          window.localStorage.setItem("user", JSON.stringify(res.data.user));
          history.push("/coInfo");
          alert(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.data.fields.length > 1) {
          setMessage("All Inputs are required.");
        } else {
          setMessage(err.response.data.messages);
        }
      });
  };
  function passwordVisibility() {
    passwordType === "password"
      ? setPasswordtype("text")
      : setPasswordtype("password");
  }
  return (
    <div>
      <div className="main_container">
        {loading ? (
          <ClipLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={60}
          />
        ) : (
          <div className="container">
            <div className="head">
              <i className="fa-solid fa-book"></i>
              <h1 className="coloured">Your</h1>
              <h1>BillBook</h1>
            </div>
            <span className="greet">Sign-Up</span>
            {message !== "" ? <ErrorMessage>{message}</ErrorMessage> : ""}
            <form>
              <div className="form-field">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleChange}
                  className="form-inp"
                />
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastname"
                  className="form-inp"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="Email"
                  id="email"
                  name="email"
                  className="form-inp"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="password-field">
                  <input
                    type={passwordType}
                    id="password"
                    name="password"
                    className="form-inp"
                    value={user.password}
                    onChange={handleChange}
                  />
                  <div className="eye-icon" onClick={passwordVisibility}>
                    {passwordType === "password" ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                </div>
              </div>
              <div className="btn" value="SignUp" onClick={signUp}>
                SignUp
              </div>
              <span>
                <div
                  className="logIn"
                  onClick={() => {
                    history.push("/");
                  }}
                  to="/"
                >
                  Already have an account ?
                </div>
              </span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
