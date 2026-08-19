import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import B2CHome from './pages/B2CHome';
import AdminCMS from './pages/AdminCMS';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<B2CHome />} />
        <Route path="/admin" element={<AdminCMS />} />
      </Routes>
    </Router>
  );
}

export default App;
