import express from 'express';
import data from './data.js';
import userRouter from './routers/userRouter.js';
import mongoose from 'mongoose';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import path from 'path';
import dotenv from 'dotenv';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();
const app = express();
// New middle ware to parse json in the body of request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// connection to mongodb
// The connection is made parameterized
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/skymart', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Implemented app.get in 
// app.get('/api/products/:id', (req, res) => {
//     const product = data.products.find( x =>x._id === req.params.id);
//     if (product) {
//         res.send(product);
//       } else {
//         res.status(404).send({ message: 'Product Not Found' });
//       }
//   });

// app.get('/api/products', (req, res) => {  // getting rid of static data
//   res.send(data.products);
// });

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});
// Google Map(59)
app.get('/api/config/google', (req, res) => {
  res.send(process.env.GOOGLE_API_KEY || '');
});// End of Google Map(59)

// Upload Product Image(40)
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });
// Deploying on Heroku
app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});