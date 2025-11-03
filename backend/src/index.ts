
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

console.log('Index.ts - Supabase URL:', process.env.VITE_SUPABASE_URL);
console.log('Index.ts - Supabase Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Loaded' : 'Not Loaded');
import productRoutes from '@routes/product.routes';
import express from 'express';
import cors from 'cors';
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
