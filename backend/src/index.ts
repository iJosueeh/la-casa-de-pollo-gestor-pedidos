import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Load environment variables from the root .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

import productRoutes from './routes/product.routes';
import orderRoutes from './routes/order.routes';
import clientRoutes from './routes/client.routes'; // Import client routes

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/clients', clientRoutes); // Mount client routes

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
});
