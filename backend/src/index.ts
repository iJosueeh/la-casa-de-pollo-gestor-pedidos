import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from '@routes/product.routes';

dotenv.config({ path: '../../.env' });

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend de La Casa de Pollo funcionando!');
});

// Usar rutas de la API
app.use('/api/products', productRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
