import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import Singleinvoice from "./SingleInvoice";
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from "./utils/DatePicker";
import { useHistory } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

export default function Invoices(props) {
  const user_id = JSON.parse(window.localStorage.getItem("user"))._id;
  const history = useHistory();
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  let color = "rgba(34, 105, 140)";
  const override = {
    margin: "200px 700px",
  };
  const [savedInvoices, setSavedInvoices] = useState([]);
  const clients = JSON.parse(window.localStorage.getItem("clients"));

  const [selectedClient, setSelectedClient] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const getInvoices = async () => {
      setLoading(true);
      window.localStorage.removeItem("currentInvoice");
      await axios
        .get("http://localhost:5000/api/invoice/getAllInvoicesWithClientInfo")
        .then((res) => {
          if (res.data.length > 0) {
            setLoading(true);
            res.data.map((item, index) => {
              if (item.user_id === user_id) {
                setSavedInvoices((savedInvoices) => [...savedInvoices, item]);
              }
            });
          }
          setLoading(false);
        })
        .catch((err) => console.log(err));
    };
    getInvoices();
  }, [user_id]);
  var invoiceNo = savedInvoices.length + 1;
  invoiceNo = invoiceNo < 10 ? `0${invoiceNo}` : invoiceNo;
  const toggleModal = () => {
    setModal(!modal);
  };
  const datepickerStyle = {
    cursor: "pointer",
    background: "none",
    border: "1px solid rgb(39, 123, 192)",
    padding: "7px 10px",
    color: "white",
    borderRadius: "15px",
    fontSize: "19px",
    width: "530px",
    marginLeft: "10px",
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  const [invoiceDetails, setInvoiceDetails] = useState({
    client_id: "",
    invoiceDate: "",
  });
  const handleClient = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails({
      ...invoiceDetails,
      [name]: value,
    });
  };
  console.log(invoiceDetails);
  const handleSave = () => {
    const { client_id, invoiceDate } = invoiceDetails;
    if (client_id && invoiceDate) {
      console.log(invoiceDetails);
      axios
        .get("http://localhost:5000/api/client/getClient", {
          params: { _id: client_id },
        })
        .then((res) => {
          setSelectedClient(res.data[0]);
        })
        .catch((err) => console.log(err));
      toggleModal();
    } else {
      setMessage("Please input all fields!");
    }
  };
  console.log(selectedClient);
  const [invoice, setInvoice] = useState();

  return (
    <>
      {loading === true ? (
        <ClipLoader
          color={color}
          loading={loading}
          cssOverride={override}
          size={60}
        />
      ) : (
        <>
          {selectedClient && invoiceDetails.invoiceDate ? (
            <Singleinvoice
              history={history}
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
              invoiceDate={invoiceDetails.invoiceDate}
              invoiceNo={invoiceNo}
            />
          ) : (
            <div className="invoicesPage">
              <div className="invoiceHeading">
                <p id="invoiceHead">Invoices</p>
                <button className="btn-sm btn-modal" onClick={toggleModal}>
                  +
                </button>
              </div>
              <div className="invoiceContainer">
                <table className="invoices-table">
                  <tbody className="content-Box">
                    <tr>
                      <th className="table-heading">#invoice</th>
                      <th className="table-heading">Date</th>
                      <th className="table-heading">Client Name</th>

                      <th className="table-heading">Due Date</th>
                      <th className="table-heading">Paid Date</th>
                      <th className="table-heading">Status</th>
                    </tr>
                  </tbody>

                  {savedInvoices.length !== 0
                    ? savedInvoices.map((invoice) => (
                        <tbody
                          key={invoice._id}
                          className="content-Box"
                          onClick={() =>
                            axios
                              .get(
                                "http://localhost:5000/api/invoice/getAllInvoicesWithProduct"
                              )
                              .then((res) => {
                                res.data.map((item) => {
                                  if (item._id === invoice._id) {
                                    setInvoice(item);
                                    window.localStorage.setItem(
                                      "currentInvoice",
                                      JSON.stringify(item)
                                    );
                                    history.push("/singleInvoice");
                                  }
                                });
                              })
                              .catch((err) => console.log(err))
                          }
                        >
                          <tr>
                            <td className="table-item">{invoice.invoiceNo}</td>
                            <td className="table-item">
                              {moment(invoice.invoiceDate).format("MMM ,D y")}
                            </td>
                            <td className="table-item">
                              {" "}
                              {invoice.clientInfo[0].name}
                            </td>

                            <td className="table-item">
                              {moment(invoice.dueDate).format("MMM ,D y")}
                            </td>
                            <td className="table-item">
                              {" "}
                              {moment(invoice.paidDate).format("MMM ,D y")}
                            </td>
                            <td
                              className={`table-item status ${invoice.status}`}
                            >
                              {invoice.status}
                            </td>
                          </tr>
                        </tbody>
                      ))
                    : ""}
                </table>
              </div>
            </div>
          )}
          {modal && (
            <div className="modal">
              <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <div className="modal-header">
                  <p className="modal-title">Create Invoice</p>
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
                  <form className="basicForm">
                    <div className="form-field">
                      <label htmlFor="client" className="form-label-2">
                        Client
                      </label>
                      <select
                        name="client_id"
                        id="client"
                        onChange={handleClient}
                      >
                        <option selected disabled hidden>
                          Select Client
                        </option>
                        {clients.map((client) => (
                          <option key={client._id} value={client._id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                      <div className="form-field">
                        <label htmlFor="invoiceDate" className="form-label-2">
                          Invoice Date
                        </label>
                        <div className="dateBox" onInput={handleClient}>
                          <DatePicker
                            style={datepickerStyle}
                            name={"invoiceDate"}
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <div className="btn-md" onClick={handleSave}>
                    Save changes
                  </div>
                  <div className="btn-md transparent" onClick={toggleModal}>
                    Close
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
