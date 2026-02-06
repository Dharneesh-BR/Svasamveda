import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import Logo from '/icons/Logo icon.png';
import SimpleDashboard from './pages/SimpleDashboard';

// Import Programs component
import Programs from './components/Programs';

import ProgramDetail from './pages/ProgramDetail';
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
import SessionDetail from './pages/SessionDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AllArticles from './pages/AllArticles';
import OrderSuccess from './pages/OrderSuccess';
import Checkout from './pages/Checkout';
// Cart, Favorites, Coaching History
import Cart from './pages/Cart';
import FavoritesPage from './pages/Favorites';
import MyCourses from './pages/MyCourses';
import CoachingHistory from './pages/CoachingHistory';
import CartIcon from './components/CartIcon';
import CartDrawer from './components/Cart';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-background">
          <Navbar />
          <CartDrawer />
          <main className="flex-grow pt-20 md:pt-16">
            <Routes>
              <Route path="/" element={<Categories />} />
              <Route path="/mind" element={<Mind />} />
              {/* Mind subpages now handled dynamically by ProgramDetail */}
              <Route path="/body" element={<Body />} />
              {/* Body subpages now handled dynamically by ProgramDetail */}
              <Route path="/soul" element={<Soul />} />
              {/* Soul subpages now handled dynamically by ProgramDetail */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/refund-and-cancellation" element={<CancellationPolicy />} />
              <Route path="/shipping-and-delivery" element={<ShippingPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/sessions/:slug" element={<SessionDetail />} />
              <Route path="/programs/:slug" element={<ProgramDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/all-articles" element={<AllArticles />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/cart" element={<RequireAuth><Cart /></RequireAuth>} />
              <Route path="/dashboard/favorites" element={<RequireAuth><FavoritesPage /></RequireAuth>} />
              <Route path="/dashboard/courses" element={<RequireAuth><MyCourses /></RequireAuth>} />
              <Route path="/coaching-history" element={<RequireAuth><CoachingHistory /></RequireAuth>} />
              <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
              <Route path="/order-success" element={<RequireAuth><OrderSuccess /></RequireAuth>} />
              <Route path="/dashboard" element={<RequireAuth><SimpleDashboard /></RequireAuth>} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
