import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import Logo from '/icons/Logo icon.png';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import DashboardRouter from './pages/dashboard/index';

// Import TestPrograms component for development
import TestPrograms from './components/TestPrograms';

import Footer from './components/Footer';
import Categories from './pages/Categories';
import Mind from './pages/Mind';
import Body from './pages/Body';
import Soul from './pages/Soul';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import CancellationPolicy from './pages/CancellationPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermsConditions from './pages/TermsConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Sessions from './pages/Sessions';
import Blog from './pages/Blog';
import AllArticles from './pages/AllArticles';
import ProgramDetail from './pages/ProgramDetail';
// Mind subpages
import ManifestAbundance from './pages/mind/ManifestAbundance';
import ReduceStress from './pages/mind/ReduceStress';
import SuperBrain from './pages/mind/SuperBrain';
import SelfSessionsMind from './pages/mind/SelfSessions';
// Body subpages
import Yoga from './pages/body/Yoga';
import Nutrition from './pages/body/Nutrition';
import Naturopathy from './pages/body/Naturopathy';
import SelfSessionsBody from './pages/body/SelfSessions';
// Soul subpages
import TraumaHealing from './pages/soul/TraumaHealing';
import SoundTherapy from './pages/soul/SoundTherapy';
import Breathwork from './pages/soul/Breathwork';
import SelfSessionsSoul from './pages/soul/SelfSessions';
// Cart, Favorites, Coaching History
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import CoachingHistory from './pages/CoachingHistory';
import CartIcon from './components/CartIcon';
import CartDrawer from './components/Cart';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-16 md:pt-0">
            <Routes>
              <Route path="/" element={<Categories />} />
              <Route path="/mind" element={<Mind />} />
              <Route path="/mind/manifest-abundance" element={<ManifestAbundance />} />
              <Route path="/mind/reduce-stress" element={<ReduceStress />} />
              <Route path="/mind/super-brain" element={<SuperBrain />} />
              <Route path="/mind/self-sessions" element={<SelfSessionsMind />} />
              <Route path="/body" element={<Body />} />
              <Route path="/body/yoga" element={<Yoga />} />
              <Route path="/body/nutrition" element={<Nutrition />} />
              <Route path="/body/naturopathy" element={<Naturopathy />} />
              <Route path="/body/self-sessions" element={<SelfSessionsBody />} />
              <Route path="/soul" element={<Soul />} />
              <Route path="/soul/trauma-healing" element={<TraumaHealing />} />
              <Route path="/soul/sound-therapy" element={<SoundTherapy />} />
              <Route path="/soul/breathwork" element={<Breathwork />} />
              <Route path="/soul/self-sessions" element={<SelfSessionsSoul />} />
              <Route path="/store" element={<Navigate to="/" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/refund-and-cancellation" element={<CancellationPolicy />} />
              <Route path="/shipping-and-delivery" element={<ShippingPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/all-articles" element={<AllArticles />} />
              <Route path="/store/*" element={<Navigate to="/" replace />} />
              <Route path="/test-programs" element={<TestPrograms />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
              <Route path="/favorites" element={<RequireAuth><Favorites /></RequireAuth>} />
              <Route path="/coaching-history" element={<RequireAuth><CoachingHistory /></RequireAuth>} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/dashboard/*" element={<RequireAuth><DashboardRouter /></RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
