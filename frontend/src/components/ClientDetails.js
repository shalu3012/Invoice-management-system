import React from "react";

function ClientDetails({ selectedClient }) {
  console.log(selectedClient);
  return (
    <div>
      <div className="clientInfoContainer">
        <div className="row1">
          <div className="companyInformation">
            <div className="content">
              <p className="companyInfoheading">Name:</p>
              <p className="companyInfocontent">{selectedClient.name}</p>
            </div>
            <div className="content">
              <p className="companyInfoheading">Website:</p>
              <p className="companyInfocontent">
                <a href={selectedClient.coWeb}>{selectedClient.coWeb}</a>
              </p>
            </div>
            <div className="content">
              <p className="companyInfoheading">Contact Name:</p>
              <p className="companyInfocontent">{selectedClient.name}</p>
            </div>
            <div className="content">
              <p className="companyInfoheading">Contact Email:</p>
              <p className="companyInfocontent">
                <a href={selectedClient.email}>{selectedClient.email}</a>
              </p>
            </div>
          </div>
          <div className="companyTaxes">
            <div className="content">
              <p className="companyInfoheading">Tax Name:</p>
              <p className="companyInfocontent">
               {selectedClient.taxName}
              </p>
            </div>
            <div className="content">
              <p className="companyInfoheading">Tax Rate:</p>
              <p className="companyInfocontent">
                {selectedClient.taxRate}
              </p>
            </div>
            <div className="content">
              <p className="companyInfoheading">Tax Number:</p>
              <p className="companyInfocontent">
                {selectedClient.taxNo}
              </p>
            </div>
          </div>
        </div>

        <div className="companyAddress">
          <div className="content">
            <p className="companyInfoheading">Street Adress:</p>
            <p className="companyInfocontent">{selectedClient.addressStreet}</p>
          </div>
          <div className="content">
            <p className="companyInfoheading">City:</p>
            <p className="companyInfocontent">{selectedClient.addressCity}</p>
          </div>
          <div className="content">
            <p className="companyInfoheading">State:</p>
            <p className="companyInfocontent">{selectedClient.addressState}</p>
          </div>
          <div className="content">
            <p className="companyInfoheading">Country:</p>
            <p className="companyInfocontent">
              {selectedClient.addressCountry}
            </p>
          </div>
          <div className="content">
            <p className="companyInfoheading">Postal Code:</p>
            <p className="companyInfocontent">{selectedClient.addressPostal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetails;
