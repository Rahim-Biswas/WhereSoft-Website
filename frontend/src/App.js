import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { AdminRoute } from './components/PrivateRoute';
import './index.css';

// Lazy-loaded pages
const Home      = lazy(() => import('./pages/Home/Home'));
const About     = lazy(() => import('./pages/About/About'));
const Services  = lazy(() => import('./pages/Services/Services'));
const Industries = lazy(() => import('./pages/Industries/Industries'));
const Products  = lazy(() => import('./pages/Products/Products'));
const Contact   = lazy(() => import('./pages/Contact/Contact'));
const Careers   = lazy(() => import('./pages/Careers/Careers'));
const Blog      = lazy(() => import('./pages/Blog/Blog'));
const Login     = lazy(() => import('./pages/Auth/Login'));
const Signup    = lazy(() => import('./pages/Auth/Signup'));
const Admin     = lazy(() => import('./pages/Admin/Admin'));

const PageLoader = () => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minHeight: '100vh', background: 'var(--bg-primary)'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: 40, height: 40, border: '2px solid rgba(0,212,255,0.2)',
        borderTopColor: 'var(--accent-cyan)', borderRadius: '50%',
        animation: 'spin 0.7s linear infinite', margin: '0 auto 12px'
      }} />
      <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        Loading...
      </div>
    </div>
  </div>
);

// Layout wrapper (hides header/footer on admin)
function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuth  = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <>
      {!isAdmin && !isAuth && <Header />}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/products"  element={<Products />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/careers"   element={<Careers />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/login"     element={<Login />} />
          <Route path="/signup"    element={<Signup />} />
          <Route path="/admin"     element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isAdmin && !isAuth && <Footer />}
    </>
  );
}

function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 16, textAlign: 'center', padding: 24,
      background: 'var(--bg-primary)', paddingTop: 'var(--header-height)'
    }}>
      <div style={{ fontSize: '5rem' }}>🌍</div>
      <h1 style={{ fontSize: '5rem', fontWeight: 700, background: 'var(--gradient-accent)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>404</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
        Oops! This coordinate doesn't exist on our map.
      </p>
      <a href="/" style={{ marginTop: 8 }} className="btn btn-primary">← Back to Home</a>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}
