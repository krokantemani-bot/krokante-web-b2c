import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import B2CHome from './pages/B2CHome';
import AdminCMS from './pages/AdminCMS';
import SaborDetail from './pages/SaborDetail';
import MostradoresPage from './pages/MostradoresPage';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<B2CHome />} />
        <Route path="/mostradores" element={<MostradoresPage />} />
        <Route path="/admin" element={<AdminCMS />} />
        <Route path="/sabores" element={<Navigate to="/sabores/fuego" replace />} />
        <Route path="/sabores/:id" element={<SaborDetail />} />
      </Routes>
    </Router>
  );
}

export default App;


