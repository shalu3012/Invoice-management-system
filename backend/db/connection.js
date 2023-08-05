const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://shalusrm181:shalu30@cluster1.mdqg1kl.mongodb.net/invoice-management-system?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Mongoose Connected successfully");
});
module.exports = db;
