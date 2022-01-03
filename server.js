import { EventListeners } from 'aws-sdk';
import express from 'express';
const app = express()
import data from './data';
import dotenv from 'dotenv';
import config from './config'
import mongoose from 'mongoose';
//bodyparser es el middleware de Express
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import path from 'path';
import uploadRoute from './routes/uploadRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
//conectando a mongo DB
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

/*


app.use('/api/uploads', uploadRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});*/

const ap = express();
ap.use(bodyParser.json());
ap.use("/api/users", userRoute);
ap.use("/api/products", productRoute);
ap.use('/api/uploads', uploadRoute);
ap.use('/api/orders', orderRoute);
ap.get('/api/config/paypal', (req, res) => {
res.send(config.PAYPAL_CLIENT_ID);
});
/*ap.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId);
  if (product)
    res.send(product);
  else
    res.status(404).send({ msg: "Product Not Found" })
});

ap.get("/api/products", (req, res) => {
  res.send(data.products);
});*/

ap.listen(5001, () => {
  console.log('Server corriendo en el puerto :5001');
});
