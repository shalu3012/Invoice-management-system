import React from "react";
import Header from "./Header";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

export default function CompanyInfo({ signUpuser, setCompanyInfo, loginUser }) {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);

  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    GetCountries()
      .then((result) => {
        setCountriesList(result);
      })
      .catch((err) => console.log(err));
  }, []);
  const loggedIn = window.localStorage.getItem("loggedIn");
  const history = useHistory();
  const user_id = signUpuser._id ? signUpuser._id : loginUser._id;
  const [coInfo, setCoInfo] = useState({
    coName: "",
    coWeb: "",
    taxName: "",
    taxRate: "",
    taxNo: "",
    addressStreet: "",
    addressCountry: "",
    addressState: "",
    addressCity: "",
    addressPostal: "",
    user_id: user_id,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoInfo({
      ...coInfo,
      [name]: value,
    });
  };
  if (coInfo.taxName === "") {
    setCoInfo({
      ...coInfo,
      taxName: undefined,
    });
  }
  const companyInfo = async () => {
    const config = { headers: { "content-type": "application/json" } };
    const {
      coName,
      coWeb,
      taxName,
      taxRate,
      taxNo,
      addressStreet,
      addressCountry,
      addressState,
      addressCity,
      addressPostal,
      user_id,
    } = coInfo;
    if (
      coName &&
      coWeb &&
      taxRate &&
      taxNo &&
      addressStreet &&
      addressCountry &&
      addressState &&
      addressCity &&
      addressPostal &&
      user_id
    ) {
      axios
        .post("http://localhost:5000/api/coInfo", coInfo, config)
        .then((res) => {
          alert(res.data.message);
          if (res.data.coInfo !== undefined || null) {
            setCompanyInfo(res.data.coInfo);
            window.localStorage.setItem(
              "companyInfo",
              JSON.stringify(res.data.coInfo)
            );
            history.push("/dashboard");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert(" not registererd");
    }
  };

  return (
    <div>
      <Header />
      <div className="main_container">
        <div className="coInfoContainer">
          <span className="setUp">Let's get you setup !</span>
          <form className="basicForm">
            <label htmlFor="companyInfo" className="form-label-2">
              Company Information
            </label>
            <div className="coInfo">
              <div className="form-field">
                <label htmlFor="coName" className="form-label-2">
                  Comapny Name
                </label>
                <input
                  type="text"
                  id="coName"
                  name="coName"
                  className="form-inp"
                  value={coInfo.coName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label htmlFor="website" className="form-label-2">
                  Website
                </label>
                <input
                  type="url"
                  id="coWeb"
                  name="coWeb"
                  className="form-inp"
                  value={coInfo.coWeb}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="taxInfo" className="form-label-2">
              Taxes Information
            </label>
            <div className="taxInfo">
              <div className="inline-form-field">
                <div className="form-field-2 left-div">
                  <label htmlFor="taxName" className="form-label-2">
                    Tax Name
                  </label>
                  <input
                    type="text"
                    id="taxName"
                    name="taxName"
                    className="form-inp"
                    placeholder="VAT(default)"
                    value={coInfo.taxName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field-2 right-div">
                  <label htmlFor="taxRate" className="form-label-2">
                    Tax Rate
                  </label>
                  <input
                    type="number"
                    id="taxRate"
                    name="taxRate"
                    className="form-inp"
                    value={coInfo.taxRate}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="taxNo" className="form-label-2">
                  Tax Number
                </label>
                <input
                  type="number"
                  id="taxNo"
                  name="taxNo"
                  className="form-inp"
                  value={coInfo.taxNo}
                  onChange={handleChange}
                />
              </div>
            </div>
            <label htmlFor="address" className="form-label-2">
              Address
            </label>
            <div className="address">
              <div className="form-field">
                <label htmlFor="street" className="form-label-2">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  name="addressStreet"
                  className="form-inp"
                  value={coInfo.addressStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="inline-form-field">
                <div className="form-field-2 left-div">
                  <label htmlFor="country" className="form-label-2">
                    Country
                  </label>
                  <select
                    id="country"
                    name="addressCountry"
                    className="form-inp"
                    onChange={(e) => {
                      handleChange(e);
                      setCountryid(e.target.selectedIndex);
                      GetState(e.target.selectedIndex)
                        .then((result) => {
                          setStateList(result);
                        })
                        .catch((err) => console.log(err));
                    }}
                    value={coInfo.addressCountry}
                  >
                    {countriesList.map((item, index) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field-2 right-div">
                  <label htmlFor="state" className="form-label-2">
                    State
                  </label>
                  <select
                    id="state"
                    name="addressState"
                    className="form-inp"
                    value={coInfo.addressState}
                    onChange={(e) => {
                      handleChange(e);
                      setStateid(Number(e.target.selectedOptions[0].id));
                      console.log(stateid);
                      GetCity(countryid, Number(e.target.selectedOptions[0].id))
                        .then((result) => {
                          setCityList(result);
                        })
                        .catch((err) => console.log(err));
                    }}
                  >
                    {stateList.map((item, index) => (
                      <option key={index} value={item.value} id={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="inline-form-field ">
                <div className="form-field-2 left-div">
                  <label htmlFor="city" className="form-label-2">
                    City
                  </label>
                  <select
                    id="state"
                    name="addressCity"
                    className="form-inp"
                    value={coInfo.addressCity}
                    onChange={(e) => {
                      handleChange(e);
                      setCityid(Number(e.target.selectedOptions[0].id));
                    }}
                  >
                    {cityList.map((item, index) => (
                      <option key={index} value={item.name} id={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-field-2 right-div">
                  <label htmlFor="taxRate" className="form-label-2">
                    Postal Code
                  </label>
                  <input
                    type="number"
                    id="postal"
                    name="addressPostal"
                    className="form-inp"
                    value={coInfo.addressPostal}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="btn" onClick={companyInfo}>
              Update
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
