const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const PORT=process.env.PORT || 5000
const userRoutes=require("./routes/userRoutes");
const companyInformationRoutes=require("./routes/companyInformationRoutes");
const clientRoutes=require("./routes/clientRoutes");
const invoiceRoutes=require("./routes/invoiceRoutes");
const errorController = require('./middleware/errorController');
require("./db/connection");
const db = require("./db/connection");

dotenv.config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use('/api/user',userRoutes);
app.use('/api/coInfo',companyInformationRoutes);
app.use('/api/client',clientRoutes);
app.use('/api/invoice',invoiceRoutes);

app.use(errorController);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
