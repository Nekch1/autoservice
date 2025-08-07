import './App.css';
import Profile from './pages/Profile';
import ProfileService from './pages/ProfileService';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import Contact from './pages/Contact';
import Header from './components/Header';
import Footer from './components/Footer';
import Policy from './pages/Policy';

import Preparation from './pages/category-pages/ServicePreparation';
import Painting from './pages/category-pages/ServicePainting';
import Polishing from './pages/category-pages/ServicePolishing';
import Paste from './pages/category-pages/ServicePaste';
import PlasticRepair from './pages/category-pages/ServicePlasticRepair';
import Aerosols from './pages/category-pages/ServiceAerosols';
import AntiCorrosionProtect from './pages/category-pages/ServiceAntiCorrosionProtection';
import NoiseInsulation from './pages/category-pages/ServiceNoiseInsulation';
import Protect from './pages/category-pages/ServiceProtect';
import Cosmetics from './pages/category-pages/ServiceCosmetics';

import ScrollToTop from './components/ScrollToTop';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';

import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminDashboard from './pages/AdminDashboard'; // ✅ Добавлен импорт панели администратора

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/profile-service" element={<ProfileService />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/service-preparation" element={<Preparation />} />
      <Route path="/catalog/service-painting" element={<Painting />} />
      <Route path="/catalog/service-polishing" element={<Polishing />} />
      <Route path="/catalog/service-paste" element={<Paste />} />
      <Route path="/catalog/service-plastic-repair" element={<PlasticRepair />} />
      <Route path="/catalog/service-aerosols" element={<Aerosols />} />
      <Route path="/catalog/service-anti-corrosion-protection" element={<AntiCorrosionProtect />} />
      <Route path="/catalog/service-noise-insulation" element={<NoiseInsulation />} />
      <Route path="/catalog/service-protect" element={<Protect />} />
      <Route path="/catalog/service-cosmetics" element={<Cosmetics />} />
      <Route path="/orders" element={<OrderHistoryPage userId={user?.id} />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* ✅ Новый маршрут */}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
