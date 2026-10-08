import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lab from './pages/Lab';
import Admin from './pages/Admin';
import TrackedRedirect from './pages/TrackedRedirect';
import { trackPage } from './lib/analytics';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!pathname.startsWith('/r/')) trackPage(pathname);
  }, [pathname]);

  return (
    <Routes>
      <Route path="r/:slug" element={<TrackedRedirect />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="lab" element={<Lab />} />
        <Route path="admin" element={<Admin />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
