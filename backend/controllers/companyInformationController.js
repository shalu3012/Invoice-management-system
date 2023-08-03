const asyncHandler = require("express-async-handler");
const CoInfo = require("../models/coInfo.model");
const generateToken = require("../utilities/gentoken");

const companyInformation = asyncHandler(async (req, res) => {
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
  } = req.body;
  if (taxName === "") {
    taxName = "VAT";
  }
  const coInfo = await CoInfo.create({
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
  });
  if (coInfo) {
    res.send({
      message: "Company information saved ",
      coInfo: {
        _id: coInfo._id,
        coName: coInfo.coName,
        coWeb: coInfo.coWeb,
        taxName: coInfo.taxName,
        taxRate: coInfo.taxRate,
        taxNo: coInfo.taxNo,
        addressStreet: coInfo.addressStreet,
        addressCountry: coInfo.addressCountry,
        addressState: coInfo.addressState,
        addressCity: coInfo.addressCity,
        addressPostal: coInfo.addressPostal,
        user_id: coInfo.user_id,
      },
    });
  } else {
    res.status(400).send(error);
  }
});
const updateCompanyInfo = asyncHandler(async (req, res) => {
  let {
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
  } = req.body;
  let coInfo = await CoInfo.findOne({ user_id });
  if (coInfo) {
    coInfo.coName = coName || coInfo.coName;
    coInfo.coWeb = coWeb || coInfo.coWeb;
    coInfo.taxName = taxName || coInfo.taxName;
    coInfo.taxRate = taxRate || coInfo.taxRate;
    coInfo.taxNo = taxNo || coInfo.taxNo;
    coInfo.addressStreet = addressStreet || coInfo.addressStreet;
    coInfo.addressCountry = addressCountry || coInfo.addressCountry;
    coInfo.addressState = addressState || coInfo.addressState;
    coInfo.addressCity = addressCity || coInfo.addressCity;
    coInfo.addressPostal = addressPostal || coInfo.addressPostal;
    coInfo.user_id = user_id || coInfo.user_id;
  }
  coInfo = await coInfo.save();
  if (coInfo) {
    res.send({
      message: "Comapny Information updated successfully",
      user: {
        _id: coInfo._id,
        coName: coInfo.coName,
        coWeb: coInfo.coWeb,
        taxName: coInfo.taxName,
        taxRate: coInfo.taxRate,
        taxNo: coInfo.taxNo,
        addressStreet: coInfo.addressStreet,
        addressCountry: coInfo.addressCountry,
        addressState: coInfo.addressState,
        addressCity: coInfo.addressCity,
        addressPostal: coInfo.addressPostal,
        user_id: coInfo.user_id,
        token: generateToken(coInfo._id),
      },
    });
  } else {
    res.status(400).send({ message: "Can't be updated" });
  }
});

module.exports = { companyInformation, updateCompanyInfo };
