import React, { useEffect, useState } from "react";
import moment from "moment";

export default function Sheet({ innerRef }) {
  let currentInvoice = JSON.parse(
    window.localStorage.getItem("currentInvoice")
  );
  let user = JSON.parse(window.localStorage.getItem("user"));
  let companyInfo = JSON.parse(window.localStorage.getItem("companyInfo"));
  let [total, setTotal] = useState(0);
  useEffect(() => {
    currentInvoice.product.map((item, index) => {
      let temp = item.price * item.qty - item.discount;
      setTotal((total) => total + temp);
    });
  }, []);
  console.log(total);
  console.log(currentInvoice);
  return (
    <div
      className="sheet padding-8mm"
      ref={innerRef}
      style={{ color: "black" }}
    >
      <table>
        <caption>
          <b> Invoice </b>
        </caption>
        <tbody>
          <tr>
            <th colSpan="3">$Invoice0000{currentInvoice.invoiceNo}</th>
            <th colSpan={3}>
              {moment(currentInvoice.invoiceDate).format("MMM ,D y")}
            </th>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colSpan="3">
              <strong>Pay To:</strong> <br />
              {currentInvoice.clientInfo[0].name}
              <br />
              {`${currentInvoice.clientInfo[0].addressStreet},${currentInvoice.clientInfo[0].addressCity}`}
              <br />
              {currentInvoice.clientInfo[0].addressState}
              <br />
              {currentInvoice.clientInfo[0].addressCountry}
              <br />
              <span>{currentInvoice.clientInfo[0].name}</span>
              <br />
              <span className="email">
                {currentInvoice.clientInfo[0].email}
              </span>
            </td>
            <td colSpan="3">
              <strong>Invoice to:</strong> <br />
              {companyInfo.coName}
              <br />
              {`${companyInfo.addressStreet},${companyInfo.addressCity}`}
              <br />
              {companyInfo.addressState}
              <br />
              {companyInfo.addressCountry}
              <br />
              <span>{companyInfo.coName}</span>
              <br />
              <span id="email">{user.email}</span>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Qty.</th>
            <th>MRP</th>
            <th>Discount</th>
            <th>Amount</th>
          </tr>
        </tbody>

        {currentInvoice.product.map((item, index) => (
          <tbody key={index}>
            <tr>
              <td>{item.item}</td>
              <td>{item.desc}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{item.discount}</td>
              <td>
                {item.price * item.qty - item.discount}
                <br />
              </td>
            </tr>
          </tbody>
        ))}
        <tbody>
          <tr>
            <th colSpan="5">Subtotal:</th>
            <td>{total}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th colSpan="4">Tax</th>
            <td>{`${companyInfo.taxName}`} </td>
            <td>{`${companyInfo.taxRate}% `}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th colSpan="5">Grand Total:</th>
            <td>{total - total * (companyInfo.taxRate / 100)}</td>
          </tr>
        </tbody>
      </table>
      {/* <div className="downloadContainer">
      
          {currentInvoice.product.map((item, index) => (
            <div className="table-items" key={index}>
             
            </div>
          ))}
        </div>
        <div className="totalBox">
          <div className="totalHeadings">
            <h1>Subtotal :</h1>
            <h1>{`${companyInfo.taxName}-${companyInfo.taxRate}%`} :</h1>
            <h1 style={{ background: "orange" }}>GrandTotal :</h1>
          </div>
          <div className="totalContent"></div>
        </div>
      </div> */}
    </div>
  );
}
