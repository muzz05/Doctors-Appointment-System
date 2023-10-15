// initializations
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./Configurations/Database");
const port = process.env.PORT || 4000;

// Rest Object
const app = express();

// Configuratiins
connectMongoDB();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./Routes/userRoute"));
app.use("/api/v1/admin", require("./Routes/adminRoutes"));
app.use("/api/v1/doctor", require("./Routes/doctorRoutes"));

// Listening
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
