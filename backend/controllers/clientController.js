const asyncHandler = require("express-async-handler");
const generateToken = require("../utilities/gentoken");
const Client = require("../models/client.model");
const Invoice = require("../models/invoice.model");
const Product = require("../models/product.model");
const db = require("../db/connection");

const addClient = asyncHandler(async (req, res) => {
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
  } = req.body;

  const client = await Client.create({
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
  });
  if (client) {
    res.send({
      message: "Client information saved ",
      client: {
        _id: client._id,
        coName: client.coName,
        coWeb: client.coWeb,
        name: client.name,
        email: client.email,
        taxName: client.taxName,
        taxRate: client.taxRate,
        taxNo: client.taxNo,
        addressStreet: client.addressStreet,
        addressCountry: client.addressCountry,
        addressState: client.addressState,
        addressCity: client.addressCity,
        addressPostal: client.addressPostal,
        user_id: client.user_id,
        token: generateToken(client._id),
      },
    });
  } else {
    res.status(400).send(error);
  }
});

const getAllClients = asyncHandler(async (req, res) => {
  const user_id = req.query.user_id;
  const agg = [
    {
      $lookup: {
        from: "invoices",
        localField: "_id",
        foreignField: "client_id",
        as: "invoices",
      },
    },
  ];
  const coll = db.collection("clients");
  const cursor = coll.aggregate(agg);
  const clients = await cursor.toArray();
  res.send(clients);
});
const getClient = asyncHandler(async (req, res) => {
  const _id = req.query._id;
  const client = await Client.find({ _id });
  if (client) {
    res.send(client);
    console.log(client);
  } else {
    console.log("}Client not found");
  }
});
const updateClient = asyncHandler(async (req, res) => {
  let {
    _id,
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
  } = req.body;
  let client = await Client.findOne({ _id });
  if (client) {
    (client.coName = coName || client.coName),
      (client.coWeb = coWeb || client.coWeb),
      (client.name = name || client.name),
      (client.email = email || client.email),
      (client.taxName = taxName || client.taxName),
      (client.taxRate = taxRate || client.taxRate),
      (client.taxNo = taxNo || client.taxNo),
      (client.addressStreet = addressStreet || client.addressStreet),
      (client.addressCountry = addressCountry || client.addressCountry),
      (client.addressState = addressState || client.addressState),
      (client.addressCity = addressCity || client.addressCity),
      (client.addressPostal = addressPostal || client.addressPostal);
  }
  client = await client.save();
  if (client) {
    res.send({
      message: "Client Information updated successfully",
      client: client,
    });
  } else {
    res.status(400).send({ message: "Can't be updated" });
  }
});
const deleteClient = asyncHandler(async (req, res) => {
  const _id = req.query._id;
  const client_id = req.query._id;
  Invoice.deleteMany({ client_id }, function (err, obj) {
    console.log(err, obj);
    Product.deleteMany({ client_id }, function (err, obj) {
      console.log(err, obj);
      return;
    });
    return;
  });

  Client.deleteOne({ _id }, function (err, obj) {
    if (err) {
      res.status(400).send(err);
    } else {
      if (obj.deletedCount > 0) {
        res.status(200).send({ message: "Deleted successfully !", obj: obj });
      } else {
        res.status(400).send({ message: "Can't Be deleted!", obj: obj });
      }
    }
  });
});
module.exports = {
  addClient,
  getAllClients,
  getClient,
  updateClient,
  deleteClient,
};
