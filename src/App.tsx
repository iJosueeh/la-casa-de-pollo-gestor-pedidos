import './App.css'

import React from "react";
import { Header, Sidebar } from "./shared/components/layout";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          {/* Aquí irá ProductCard y la lista de productos */}
          <h2 className="text-lg font-bold mb-4">Menú de Productos</h2>
        </main>
      </div>
    </div>
  );
}

export default App;