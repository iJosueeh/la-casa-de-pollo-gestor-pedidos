import React, { useEffect, useState } from "react";
import { getProductos } from "../api/productsApi";
import { Card } from "@/shared/components/iu";

type Producto = {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
};

export const ProductList: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    getProductos().then(productos => {
      console.log('Productos fetched:', productos);
      setProductos(productos);
    });
  }, []);

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {productos.map((p) => (
        <Card key={p.idProducto}>
          <h3 className="font-bold">{p.nombre}</h3>
          <p>{p.descripcion}</p>
          <span>S/. {p.precio.toFixed(2)}</span>
        </Card>
      ))}
    </div>
  );
};
