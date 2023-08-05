import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "./utils/DatePicker";
import Products from "./Products";
import axios from "axios";
import moment from "moment";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDownRounded";
import { OptionModal } from "./utils/OptionModal";

export default function SingleInvoice(props) {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [invoice, setInvoice] = useState({
    invoiceNo:
      props.invoiceNo ||
      JSON.parse(localStorage.getItem("currentInvoice")).invoiceNo,
    status: "",
    invoiceDate:
      props.invoiceDate ||
      moment(
        JSON.parse(localStorage.getItem("currentInvoice")).invoiceDate
      ).format(),
    dueDate: "",
    paidDate: "",
    user_id: "",
    company_id: "",
    client_id: "",
    _id: "",
  });
  useEffect(() => {
    addCurrentProducts();
  }, []);

  function toggleModal() {
    show ? setShow(false) : setShow(true);
  }

  function addCurrentProducts() {
    console.log("current products");
    let currentInvoice = JSON.parse(
      window.localStorage.getItem("currentInvoice")
    );
    if (currentInvoice) {
      setInvoice(currentInvoice);
      let currentProducts = currentInvoice.product;
      console.log(currentProducts);
      if (currentProducts) {
        let tempProducts = [...products, currentProducts];
        setProducts(...tempProducts);
      }
    }
  }
  function handleChange(e) {
    if (
      ["item", "qty", "price", "discount", "desc", "unit"].includes(
        e.target.name
      )
    ) {
      let { name, value } = e.target;
      let dataId = Number(e.target.dataset.id);
      const newArray = products.map((product, i) => {
        if (dataId === i) {
          return { ...product, [name]: value };
        } else {
          return product;
        }
      });
      setProducts(newArray);
    } else {
      let name = e.target.name;
      let value = e.target.value;
      setInvoice((invoice) => ({ ...invoice, [name]: value }));
    }
  }
  function clicked(e, name) {
    console.log(e);
    console.log(name);
    let value = e.target.value;
    setInvoice((invoice) => ({
      ...invoice,
      [name]: value,
    }));
  }
  function addNewRow(e) {
    e.preventDefault();
    // console.log(e);
    // console.log("adding product row");
    let productsRow = [
      ...products,
      {
        qty: "",
        price: "",
        discount: "",
        desc: "",
        unit: "",
        subtotal: "",
        total: "",
      },
    ];
    setProducts(productsRow);
    // console.log(products);
  }
  function deteteRow(index) {
    setProducts((products) => products.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let client_id;
    let selectedClient = props.selectedClient;
    console.log(selectedClient);
    if (selectedClient) {
      client_id = selectedClient._id;
    }
    let currentInvoice = JSON.parse(localStorage.getItem("currentInvoice"));
    if (currentInvoice) {
      var _id = currentInvoice ? currentInvoice._id : "";
      let clientInfo = currentInvoice.clientInfo[0];
      client_id = clientInfo._id ? clientInfo._id : client_id;
    }
    //might be an error
    let data = {
      invoiceNo: invoice.invoiceNo,
      status: invoice.status,
      invoiceDate: invoice.invoiceDate,
      dueDate: invoice.dueDate,
      paidDate: invoice.paidDate,
      products: products,
      user_id: JSON.parse(window.localStorage.getItem("user"))._id,
      company_id: JSON.parse(window.localStorage.getItem("companyInfo"))._id,
      client_id: client_id,
      _id: _id,
    };
    console.log(data);
    axios.defaults.headers.common["Authorization"] =
      localStorage.getItem("token");
    if (data._id && products) {
      axios
        .post("http://localhost:5000/api/invoice/updateInvoice", data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            history.push("/invoices");
          }
        })
        .catch((error) => {
          if (error) {
            alert("Bad Request");
            console.log(error);
          }
        });
    } else {
      axios
        .post("http://localhost:5000/api/invoice", data)
        .then((res) => {
          if (res.data.success) {
            alert(res.data.message);
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error) {
            alert("Bad Request");
            console.log(error);
          }
        });
    }
  }
  function clickOnDelete(record) {
    console.log(record);
    setProducts((products) => products.filter((product) => product !== record));
    axios
      .delete("http://localhost:5000/api/invoice/deleteProduct", {
        params: { _id: record._id },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err));
  }

  let currentInvoice = JSON.parse(
    window.localStorage.getItem("currentInvoice")
  );
  let companyInfo = JSON.parse(window.localStorage.getItem("companyInfo"));
  let user = JSON.parse(window.localStorage.getItem("user"));
  let selectedClient = props.selectedClient;
  console.log(selectedClient);
  if (currentInvoice) {
    var clientInfo = currentInvoice.clientInfo[0];
    selectedClient = clientInfo || selectedClient;
  }
  const datepickerStyle = {
    cursor: "pointer",
    background: "none",
    border: "1px solid #277bc0",
    padding: "7px 0px",
    textAlign: "center",
    color: " white",
    borderRadius: "15px",
    fontSize: "19px",
    width: "166px",
    marginLeft: "80px",
  };
  console.log(products);
  console.log(invoice);
  return (
    <>
      <div className="mainInvoiceContainer">
        <div className="invoiceNo">
          <div className="invoiceNo">
            Invoice# 00000
            {currentInvoice ? currentInvoice.invoiceNo : props.invoiceNo}
          </div>
        </div>
        <div className="traders">
          <div className="payer">
            <span className="invoiceSpan">Invoice to :</span>
            <h3 className="invoiceName">{selectedClient.name}</h3>
            <p className="clientAddress">
              {`${selectedClient.addressStreet}, ${selectedClient.addressCity}, ${selectedClient.addressState}, ${selectedClient.addressPostal}, ${selectedClient.addressCountry}`}
            </p>
            <hr />
            <p>{selectedClient.name}</p>
            <p id="clientEmail">{selectedClient.email}</p>
          </div>
          <div className="payee">
            <span className="invoiceSpan">Pay To :</span>
            <h3 className="invoiceName">{companyInfo.coName}</h3>
            <p>
              {`${companyInfo.addressStreet}, ${companyInfo.addressCity}, ${companyInfo.addressState}, ${companyInfo.addressPostal}, ${companyInfo.addressCountry}`}
            </p>
            <p>{`${companyInfo.taxName} #${companyInfo.taxNo}`}</p>
            <hr />
            <p>{`${user.firstname} ${user.lastname}`}</p>
            <p id="userEmail">{user.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} onChange={handleChange} id="invoiveForm">
          <div className="invoiceInfo">
            <div className="invoiceDetails">
              <div>
                <div className="options">
                  <div className="option" onClick={toggleModal}>
                    <ArrowDropDownIcon />
                    Options
                  </div>
                  {show ? (
                    <>
                      <div
                        onClick={toggleModal}
                        className="dropdownOverlay"
                      ></div>
                      <OptionModal
                        show={show}
                        currentInvoice={currentInvoice}
                      />
                    </>
                  ) : (
                    ""
                  )}

                  <div className="save">
                    <button type="submit">Save</button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="label">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                </div>
                <select
                  name="status"
                  id="status"
                  onChange={handleChange}
                  value={invoice.status}
                >
                  <option value="Draft">Draft</option>
                  <option value="Paid">Paid</option>
                  <option value="Sent">Sent</option>
                </select>
                <div className="label">
                  <label htmlFor="invoiceDate" className="form-label">
                    Invoice Date
                  </label>
                </div>
                <div className="dateBox">
                  <input
                    className="form-inp"
                    type="text"
                    id="invoiceDate"
                    value={
                      moment(props.invoiceDate).format("MMM ,D y") ||
                      moment(currentInvoice.invoiceDate).format("MMM ,D y")
                    }
                    disabled
                  />
                </div>
              </div>
              <div className="row">
                <div className="label">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date
                  </label>
                </div>
                <div className="dateBox" onInput={(e) => clicked(e, "dueDate")}>
                  <DatePicker
                    style={datepickerStyle}
                    name={"dueDate"}
                    value={
                      new Date(currentInvoice ? currentInvoice.dueDate : "")
                    }
                  />
                </div>
                <div className="label">
                  <label htmlFor="paidDate" className="form-label">
                    Paid Date
                  </label>
                </div>
                <div
                  className="dateBox"
                  onInput={(e) => clicked(e, "paidDate")}
                >
                  <DatePicker
                    style={datepickerStyle}
                    name={"paidDate"}
                    value={
                      new Date(currentInvoice ? currentInvoice.paidDate : "")
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="addNew-btn" onClick={addNewRow}>
            + Add new product
          </div>
          <div className="itemsContiner">
            <Products
              add={addNewRow}
              deleteProduct={clickOnDelete}
              products={products}
            />
          </div>
        </form>
      </div>
    </>
  );
}
