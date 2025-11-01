
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="producto" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
