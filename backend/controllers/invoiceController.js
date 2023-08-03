const asyncHandler = require("express-async-handler");
const generateToken = require("../utilities/gentoken");
const Invoice = require("../models/invoice.model");
const Product = require("../models/product.model");
const db = require("../db/connection");
const Client = require("../models/client.model");

const addInvoice = asyncHandler(async (req, res) => {
  var invoiceObj = new Invoice({
    user_id: req.body.user_id,
    company_id: req.body.company_id,
    client_id: req.body.client_id,
    invoiceNo: req.body.invoiceNo,
    status: req.body.status ? req.body.status : "Draft",
    invoiceDate: req.body.invoiceDate,
    dueDate: req.body.dueDate,
    paidDate: req.body.paidDate,
  });
  invoiceObj.save(function (err, invoice) {
    if (err) return res.status(400).json({ err: err });
    if (invoice) {
      if (req.body.products.length !== 0) {
        req.body.products.map((product, index) => {
          var productsObj = new Product({
            user_id: req.body.user_id,
            company_id: req.body.company_id,
            client_id: req.body.client_id,
            invoice_id: invoice._id,
            item: product.item,
            qty: product.qty,
            price: product.price,
            discount: product.discount,
            desc: product.desc,
            unit: product.unit,
            subtotal: product.price * product.qty,
            total: product.price * product.qty - product.discount,
          });
          productsObj.save((error, savedTask) => {
            if (err) {
              invoiceObj.deleteOne({ _id: invoice._id }, function (err) {
                return res.status(400).send({ err: error });
              });
              productsObj.deleteOne(
                { invoice_id: invoice._id },
                function (err) {
                  return res.status(400).send({ err: error });
                }
              );
              return res.status(400).send({ err: error });
            }
          });
        });
      }

      return res.status(201).json({
        success: true,
        message: "Invoice  Successfully Saved",
      });
    }
  });
});
const updateInvoice = asyncHandler(async (req, res) => {
  let { status, dueDate, paidDate } = req.body;
  let { _id } = req.body;
  let invoice = await Invoice.findOne({ _id });
  if (invoice) {
    invoice.status = status || invoice.status;
    invoice.dueDate = dueDate || invoice.dueDate;
    invoice.paidDate = paidDate || invoice.paidDate;
    req.body.products.map(async (product, index) => {
      if (product._id) {
        let savedProduct = await Product.findOne({ _id: product._id });
        console.log(savedProduct);
        if (savedProduct) {
          savedProduct.item = product.item || savedProduct.item;
          savedProduct.qty = product.qty || savedProduct.qty;
          savedProduct.price = product.price || savedProduct.price;
          savedProduct.discount = product.discount || savedProduct.discount;
          savedProduct.desc = product.desc || savedProduct.desc;
          savedProduct.unit = product.unit || savedProduct.unit;
          (savedProduct.subtotal =
            product.subtotal || savedProduct.price * savedProduct.qty),
            (savedProduct.total =
              product.total ||
              savedProduct.price * savedProduct.qty - savedProduct.discount);
        }
        if (savedProduct) {
          savedProduct = await savedProduct.save();
        }
      } else {
        var productsObj = new Product({
          user_id: req.body.user_id,
          company_id: req.body.company_id,
          client_id: req.body.client_id,
          invoice_id: invoice._id,
          item: product.item,
          qty: product.qty,
          price: product.price,
          discount: product.discount,
          desc: product.desc,
          unit: product.unit,
        });
        productsObj.save((error, savedTask) => {
          if (error) {
            return res.status(400).send({ error });
          }
        });
      }
    });
  }
  invoice = await invoice.save();
  if (invoice) {
    res.send({
      success: true,
      message: "Invoice Information updated successfully",
    });
  } else {
    res.status(400).send({ message: "Can't be updated" });
  }
});

const getAllInvoicesWithClientInfo = asyncHandler(async (req, res) => {
  const agg = [
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "clientInfo",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "_id",
        as: "user",
      },
    },
  ];
  const coll = db.collection("invoices");
  const cursor = coll.aggregate(agg);
  const invoices = await cursor.toArray();
  res.send(invoices);
});
const getAllInvoicesWithProduct = asyncHandler(async (req, res) => {
  const agg = [
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "invoice_id",
        as: "product",
      },
    },
    {
      $lookup: {
        from: "clients",
        localField: "client_id",
        foreignField: "_id",
        as: "clientInfo",
      },
    },
  ];
  const coll = db.collection("invoices");
  const cursor = coll.aggregate(agg);
  const invoices = await cursor.toArray();
  res.send(invoices);
});
const getInvoiceWithProducts = asyncHandler(async (req, res) => {
  const agg = [
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "invoice_id",
        as: "product",
      },
    },
  ];
  const coll = db.collection("invoices");
  const cursor = coll.aggregate(agg);
  const invoices = await cursor.toArray();
  if (invoices) {
    res.send(invoices);
  }
});
const getInvoiceByClientId = asyncHandler(async (req, res) => {
  const client_id = req.query.client_id;
  const invoice = await Invoice.find({ client_id });
  if (invoice) {
    res.send(invoice);
  }
});
const getInvoiceByUser_id = asyncHandler(async (req, res) => {
  // const user_id=req.query.user_id
  // const invoice=await Invoice.find({user_id})
  // if(invoice){
  //   const client_id=invoice.client_id;
  //   const client=await Client.find({_id:client_id})
  //   if(client&&invoice){
  //   res.send({
  //     invoice,
  //     clie
  //   })
  // }
  // }
});
const getInvoiceByClientIdAndInvoiceDate = asyncHandler(async (req, res) => {
  const client_id = req.query.client_id;
  const invoiceDate = req.query.invoiceDate;
  const invoice = await Invoice.find({
    client_id: client_id,
    invoiceDate: invoiceDate,
  });
  if (invoice) {
    res.send(invoice);
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  const _id = req.query._id;
  Product.deleteOne({ _id }, function (err, obj) {
    if (err) res.status(400).send({ message: "Can not be deleted" });
    res.status(200).send({ message: "Deleted successfully !" });
  });
});
const deleteInvoice = asyncHandler(async (req, res) => {
  const _id = req.query._id;
  const invoice_id = req.query._id;
  Product.deleteMany({ invoice_id }, function (err, obj) {
    return;
  });
  Invoice.deleteOne({ _id }, function (err, obj) {
    if (obj.deletedCount === 1) {
      res.status(200).send({ message: "Deleted successfully !", obj: obj });
    } else {
      res.status(400).send({ message: "Can't Be deleted!", obj: obj });
    }
  });
});
module.exports = {
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceByUser_id,
  getAllInvoicesWithClientInfo,
  getInvoiceByClientId,
  getInvoiceByClientIdAndInvoiceDate,
  getAllInvoicesWithProduct,
  deleteProduct,
  getInvoiceWithProducts,
};
