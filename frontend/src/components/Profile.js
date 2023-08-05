import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import ErrorMessage from "./ErrorMessage";

export default function Profile({ signUpuser, companyInfo, loginUser }) {
  let color = "rgba(34, 105, 140)";
  const override = {
    display: "block",
    margin: "200px auto",
  };
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  console.log(user);
  const [coInfo, setCoInfo] = useState(
    JSON.parse(window.localStorage.getItem("companyInfo"))
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  console.log(coInfo);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setCoInfo({ ...coInfo, [name]: value });
  };
  const updateUserInfo = async () => {
    const config = { headers: { "content-type": "application/json" } };
    if (user._id) {
      setLoading(true);
      await axios
        .post("http://localhost:5000/api/user/updateUserInfo", user, config)
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
            window.localStorage.setItem("user", JSON.stringify(res.data.user));
          }
          alert("Company information updated successfully.");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.response.data.message);
        });
    }
  };
  const updateCoInfo = async () => {
    const config = { headers: { "content-type": "application/json" } };
    if (coInfo.user_id) {
      setLoading(true);
      await axios
        .post(
          "http://localhost:5000/api/coInfo/updateCompanyInfo",
          coInfo,
          config
        )
        .then((res) => {
          if (res.data.coInfo) {
            setUser(res.data.coInfo);
            window.localStorage.setItem(
              "companyInfo",
              JSON.stringify(res.data.coInfo)
            );
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setMessage(error.response.data.message);
        });
    }
  };
  const update = () => {
    updateUserInfo();
    updateCoInfo();
  };
  return (
    <div>
      <Header />
      <div className="heading">
        <p>Profile</p>
      </div>
      {loading && (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={60}
        />
      )}
      {message !== "" ? <ErrorMessage>{message}</ErrorMessage> : ""}
      <div className="profile_mainContainer">
        <div className="profile_container">
          <form action="" className="basicForm">
            <label htmlFor="" className="form-label">
              Personal Information
            </label>
            <div className="main-form-field">
              <div className="form-field">
                <label htmlFor="" className="form-label-2">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="form-inp"
                  value={user.firstname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="" className="form-label-2">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-inp"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="" className="form-label">
              Taxes Information
            </label>
            <div className="main-form-field">
              <div className="profile-inline-form-field">
                <div className="form-field-2">
                  <label htmlFor="" className="form-label-2">
                    Tax Name
                  </label>
                  <input
                    type="text"
                    name="taxName"
                    id="nameTax"
                    className="form-inp"
                    value={coInfo.taxName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field-2">
                  <label htmlFor="" className="form-label-2">
                    Tax Rate (%)
                  </label>
                  <input
                    type="text"
                    name="taxRate"
                    id="rateTax"
                    className="form-inp"
                    value={coInfo.taxRate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="" className="form-label">
                  Tax Number
                </label>
                <input
                  type="text"
                  name="taxNo"
                  className="form-inp"
                  value={coInfo.taxNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="buttonContainer">
              <div className="btn-profile" onClick={update}>
                Update
              </div>
            </div>
          </form>
        </div>
        <div className="profile_container">
          <form action="" className="basicForm">
            <label htmlFor="" className="form-label">
              Company Information
            </label>
            <div className="main-form-field">
              <div className="form-field">
                <label htmlFor="" className="form-label-2">
                  Company Name
                </label>
                <input
                  type="text"
                  name="coName"
                  className="form-inp"
                  value={coInfo.coName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="" className="form-label-2">
                  Company Website
                </label>
                <input
                  type="text"
                  name="coWeb"
                  className="form-inp"
                  value={coInfo.coWeb}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="" className="form-label">
              Address
            </label>
            <div className="main-form-field">
              <div className="form-field">
                <label htmlFor="" className="form-label">
                  Street Address
                </label>
                <input
                  type="text"
                  name="addressStreet"
                  className="form-inp"
                  value={coInfo.addressStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="profile-inline-form-field">
                <div className="form-field-2">
                  <label htmlFor="" className="form-label-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="addressCountry"
                    id="profileCountry"
                    className="inline-form-inp"
                    value={coInfo.addressCountry}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field-2">
                  <label htmlFor="" className="form-label-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="addressState"
                    id="profileState"
                    className="inline-form-inp"
                    value={coInfo.addressState}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="profile-inline-form-field">
                <div className="form-field-2">
                  <label htmlFor="" className="form-label-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="addressCity"
                    id="profileCity"
                    className="inline-form-inp"
                    value={coInfo.addressCity}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field-2">
                  <label htmlFor="" className="form-label-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="addressPostal"
                    id="profilePostal"
                    className="inline-form-inp"
                    value={coInfo.addressPostal}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
