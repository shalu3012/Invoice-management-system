import React from "react";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import ClipLoader from "react-spinners/ClipLoader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Home({ setLoginUser, setCompanyInfo }) {
  let color = "rgba(34, 105, 140)";
  const override = {
    margin: "200px auto",
  };
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
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
  const logIn = () => {
    const email = user.email;
    const password = user.password;
    const config = { headers: { "content-type": "application/json" } };
    if (email && password) {
      setLoading(true);
      axios
        .post("http://localhost:5000/api/user", user, config)
        .then((res) => {
          if (res.data.user) {
            console.log(res.data.user);
            setLoginUser(res.data.user);
            setUser(res.data.user);
            window.localStorage.setItem("IsloggedIn", true);
            window.localStorage.setItem("user", JSON.stringify(res.data.user));
            setLoading(false);
            if (res.data.coInfo) {
              setCompanyInfo(res.data.coInfo);
              window.localStorage.setItem(
                "companyInfo",
                JSON.stringify(res.data.coInfo)
              );
            }
            history.push("/dashboard");
          } else {
            setMessage("Invalid email or password");
          }
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.response.data.message);
        });
    } else {
      setMessage("Invalid Email or Password");
    }
  };
  function passwordVisibility() {
    passwordType === "password"
      ? setPasswordtype("text")
      : setPasswordtype("password");
  }
  return (
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
          <span className="greet">Hi, Welcome</span>
          {message !== "" ? <ErrorMessage>{message}</ErrorMessage> : ""}
          <form className="basicForm">
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="Email"
                id="email"
                className="form-inp"
                name="email"
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
              <span>
                <div className="forgotPassword" to="#">
                  Forgot password ?
                </div>
              </span>
            </div>
            <div className="btn" value="Login" onClick={logIn}>
              LogIn
            </div>
            <span>
              <div
                className="register"
                onClick={() => {
                  history.push("/signUp");
                }}
              >
                Don't have an account ?
              </div>
            </span>
          </form>
        </div>
      )}
    </div>
  );
}
