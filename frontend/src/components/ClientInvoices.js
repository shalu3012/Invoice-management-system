import React,{useEffect,useState} from 'react'
import axios from 'axios'
import moment from "moment/moment";
import { useHistory } from 'react-router-dom';

function ClientInvoices({selectedClient}) {
  const history=useHistory()
  const client_id=selectedClient._id
  const [savedInvoices,setSavedInvoices]=useState([])
  const [invoice, setInvoice] = useState();
  useEffect(() => {
    const getInvoices=async()=>{
    await axios
      .get("http://localhost:5000/api/invoice/getInvoiceByClientId",{params:{client_id:client_id}})
      .then((res) => {
        setSavedInvoices(res.data)
      });
    }
    getInvoices()
  },[client_id])
  console.log(savedInvoices)
  return (
    <div>
      <div className="clientInvoices">
              <div className="invoiceHeading">
                <p id="invoiceHead">Invoices</p>
              </div>
              <div className="invoiceContainer">
                <div className="content-Box-Head">
                  <p className="invoice-box">
                    <strong>#Invoice</strong>
                  </p>
                  <p className="date-box">
                    <strong>Date</strong>
                  </p>
                  <p className="client-name">
                    <strong>Client Name</strong>
                  </p>
                  <p className="headStatus">
                    <strong>status</strong>
                  </p>
                  <p className="date-box">
                    <strong>Due Date</strong>
                  </p>
                  <p className="date-box">
                    <strong>Paid Date</strong>
                  </p>
                </div>
                {savedInvoices.length!==0? savedInvoices.map((invoice,index) => (
                      <div
                        key={invoice._id}
                        className="content-Box"
                        onClick={() => 
                          axios.get("http://localhost:5000/api/invoice/getAllInvoicesWithProduct")
                          .then((res)=>{
                            console.log(res.data)
                            res.data.map((item)=>{
                              if(item._id===invoice._id){
                                setInvoice(item);
                                window.localStorage.setItem('currentInvoice',JSON.stringify(item))
                                history.push('/singleInvoice')
                              }
                            })
                          })}
                      >
                        <p className="invoice-box">{invoice.invoiceNo}</p>
                        <p className="date-box">
                          {moment(invoice.invoiceDate).format("MMM ,D y")}
                        </p>
                        <p className="client-name">
                          {selectedClient.name}
                        </p>
                        <p className="status">{invoice.status}</p>
                        <p className="date-box">
                          {moment(invoice.dueDate).format("MMM ,D y")}
                        </p>
                        <p className="date-box">
                          {moment(invoice.paidDate).format("MMM ,D y")}
                        </p>
                      </div>
                    ))
                  : ""}
                </div>
             </div>
    </div>
  )
}

export default ClientInvoices;