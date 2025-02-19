import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import errorhandler from "./middlewares/errorhandler.js";


dotenv.config();

connectDB();
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors()); 


app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/cart", cartRoutes);

app.get("/", (req, res) => {
    return res.status(200).send("<h1>welcome to node server </h1>");

});
app.use(errorhandler);
app.use(
    morgan("combined", {
      stream: { write: (message) => logger.info(message.trim()), }, })
  );


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on port ${process.env.PORT}`);
});