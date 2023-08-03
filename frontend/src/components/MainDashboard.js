import React from "react";
// import Client from './Client'
// import Invoices from './Invoices'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

export default function MainDashboard({ signUpuser, loginUser }) {
  const user_id = signUpuser._id
    ? signUpuser._id
    : loginUser._id || JSON.parse(window.localStorage.getItem("user"))._id;
  const [clients, setClients] = useState([]);
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const respclients = await axios(
        "http://localhost:5000/api/client/getAllClients",
        { params: { user_id: user_id } }
      );
      const respinvoices = await axios(
        "http://localhost:5000/api/invoice/getAllInvoicesWithClientInfo"
      );
      respclients.data.map((client, index) => {
        if (client.user_id === user_id) {
          setClients((clients) => [...clients, client]);
        }
      });
      if (respinvoices.data.length > 0) {
        respinvoices.data.map((item, index) => {
          if (item.user_id === user_id) {
            setInvoices((invoices) => [...invoices, item]);
          }
        });
      }
    };
    fetchData();
  }, []);
  window.localStorage.setItem("clients", JSON.stringify(clients));
  if (clients.length > 5) {
    setClients(clients.slice(-5));
  }
  return (
    <div className="MainDashboard">
      <div className="clients">
        <p className="dashboard-headings">
          Recent Clients
          <span style={{ margin: "auto" }}>
            <Link to="/clients" className="viewAll">
              View all
            </Link>
          </span>
        </p>
        <div className="dashboard-client-container clientContainer">
          <table className="dashboard-invoices-table">
            <tbody className="content-Box">
              <th className="table-heading">
                <strong>Name</strong>
              </th>
              <th className="table-heading">
                <strong>Tax</strong>
              </th>
              <th className="table-heading">
                <strong>Invoices</strong>
              </th>
            </tbody>
            {clients.map((client, index) => (
              <tbody className="content-Box" key={client._id}>
                <td className="table-item">{client.name}</td>
                <td className="table-item">{client.taxName}</td>
                <td className="table-item">{client.invoices.length}</td>
              </tbody>
            ))}
          </table>
        </div>
      </div>
      <div className="invoices">
        <p className="dashboard-headings">
          Invoices
          <span style={{ margin: "auto" }}>
            <Link to="/invoices" className="viewAll">
              View all
            </Link>
          </span>
        </p>
        <div className="invoiceContainer dashboard-invoice-container">
          <table className="dashboard-invoices-table">
            <tbody className="content-Box">
              <th className="table-heading">
                <strong>#Invoice</strong>
              </th>
              <th className="table-heading">
                <strong>Date</strong>
              </th>
              <th className="table-heading">
                <strong>Client Name</strong>
              </th>
              <th className="table-heading">
                <strong>Status</strong>
              </th>
            </tbody>
            {invoices !== null || undefined
              ? invoices.map((invoice, index) => (
                  <tbody className="content-Box" key={invoice._id}>
                    <td className="table-item">{invoice.invoiceNo}</td>
                    <td className="table-item">
                      {moment(invoice.invoiceDate).format("MMM ,D y")}
                    </td>
                    <td className="table-item">{invoice.clientInfo[0].name}</td>
                    <td className="table-item">{invoice.status}</td>
                  </tbody>
                ))
              : ""}
          </table>
        </div>
      </div>
    </div>
  );
}
