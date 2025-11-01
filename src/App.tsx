import './App.css'
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from "./shared/components/layout";


function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
