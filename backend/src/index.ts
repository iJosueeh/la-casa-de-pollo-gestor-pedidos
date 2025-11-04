import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';


dotenv.config({ path: path.join(__dirname, '../../.env') });

import productRoutes from '@routes/product.routes';
import categoryRoutes from '@routes/category.routes';
import authRoutes from '@routes/auth.routes';
import clientRoutes from '@routes/client.routes';
import orderRoutes from '@routes/order.routes';
import adminDashboardRoutes from '@routes/adminDashboard.routes';

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminDashboardRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en http://localhost:${PORT}`);
  console.log('Backend started successfully!');
});
