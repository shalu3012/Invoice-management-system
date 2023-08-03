import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorMessage from "./ErrorMessage";
import SingleClient from "./SingleClient";
import { GetCountries, GetState, GetCity } from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

export default function Client({ signUpuser, loginUser }) {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [recentClients, setRecentClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState({});

  //For Country-State-City List
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);

  const config = { headers: { "content-type": "application/json" } };
  const user_id = signUpuser._id
    ? signUpuser._id
    : loginUser._id || JSON.parse(window.localStorage.getItem("user"))._id;
  const [client, setClient] = useState({
    coName: "",
    coWeb: "",
    name: "",
    email: "",
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
    setClient({
      ...client,
      [name]: value,
    });
  };
  if (client.taxName === "") {
    setClient({
      ...client,
      taxName: undefined,
    });
  }
  const addClient = () => {
    const {
      coName,
      coWeb,
      name,
      email,
      taxName,
      taxRate,
      taxNo,
      addressStreet,
      addressCountry,
      addressState,
      addressCity,
      addressPostal,
      user_id,
    } = client;
    if (
      coName &&
      coWeb &&
      name &&
      email &&
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
        .post("http://localhost:5000/api/client", client, config)
        .then((res) => {
          alert(res.data.message);
          if (res.data.client !== undefined || null) {
            setClient(res.data.client);
            setModal(false);
          } else {
            alert("error");
          }
        });
    } else {
      setMessage("Please input all fields");
    }
  };
  useEffect(() => {
    const getAllClients = () => {
      axios
        .get("http://localhost:5000/api/client/getAllClients", config)
        .then((res) => {
          res.data.map(async (client, index) => {
            if (client.user_id === user_id) {
              setRecentClients((recentClients) => [...recentClients, client]);
            }
          });
          return () => {
            window.localStorage.setItem(
              "clients",
              JSON.stringify(recentClients)
            );
          };
        });
    };
    getAllClients();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title">Add Client</p>
              {message !== "" ? (
                <ErrorMessage
                  styles={{
                    margin: "8px 0px 0px 80px",
                    padding: " 2px 30px",
                    fontSize: "17px",
                  }}
                >
                  {message}
                </ErrorMessage>
              ) : (
                ""
              )}
              <button
                type="button"
                className="btn-close-modal"
                onClick={toggleModal}
              >
                +
              </button>
            </div>
            <div className="modal-body">
              <div className="main_container">
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
                        value={client.coName}
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
                        value={client.coWeb}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="inline-form-field">
                      <div className="form-field-2 left-div">
                        <label htmlFor="name" className="form-label-2">
                          Contact Name
                        </label>
                        <input
                          type="text"
                          id="contactName"
                          name="name"
                          className="form-inp"
                          value={client.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-field-2 right-div">
                        <label htmlFor="email" className="form-label-2">
                          Contact Email
                        </label>
                        <input
                          type="email"
                          id="contactEmail"
                          name="email"
                          className="form-inp"
                          value={client.email}
                          onChange={handleChange}
                        />
                      </div>
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
                          value={client.taxName}
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
                          value={client.taxRate}
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
                        value={client.taxNo}
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
                        value={client.addressStreet}
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
                            GetState(e.target.selectedIndex).then((result) => {
                              setStateList(result);
                            });
                          }}
                          value={client.addressCountry}
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
                          value={client.addressState}
                          onChange={(e) => {
                            handleChange(e);
                            setStateid(Number(e.target.selectedOptions[0].id));
                            console.log(stateid);
                            GetCity(
                              countryid,
                              Number(e.target.selectedOptions[0].id)
                            ).then((result) => {
                              setCityList(result);
                            });
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
                          value={client.addressCity}
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
                          value={client.addressPostal}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <div className="btn-md" onClick={addClient}>
                Save changes
              </div>
              <div className="btn-md transparent" onClick={toggleModal}>
                Close
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedClient && selectedClient._id ? (
        <SingleClient selectedClient={selectedClient} />
      ) : (
        <div className="clientsPage">
          <div className="clientHeading">
            <p id="clientHead">Clients</p>
            <button className="btn-sm btn-modal" onClick={toggleModal}>
              +
            </button>
          </div>
          <div className="clientContainer">
            <table className="clients-table">
              <tbody className="content-Box">
                <tr>
                  <th className="table-heading">Name</th>
                  <th className="table-heading">tax</th>
                  <th className="table-heading">Invoices</th>
                  <th className="table-heading">Address</th>
                </tr>
              </tbody>
              {recentClients.map((client) => (
                <tbody
                  className="content-Box"
                  key={client._id}
                  onClick={() =>
                    axios
                      .get("http://localhost:5000/api/client/getClient", {
                        params: { _id: client._id },
                      })
                      .then((res) => {
                        setSelectedClient(res.data[0]);
                      })
                  }
                >
                  <tr>
                    <td className="table-item">{client.name}</td>
                    <td className="table-item">
                      {`${client.taxName}-${client.taxRate}%`}
                    </td>
                    <td className="table-item">{client.invoices.length}</td>
                    <td className="table-item">
                      {`${client.addressCity}, ${client.addressState}, ${client.addressCountry}`}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
}
