import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Writing } from "./pages/Writing";
import { Post } from "./pages/Post";
import { About } from "./pages/About";
import { CaseStudy } from "./pages/CaseStudy";
import { NotFound } from "./pages/NotFound";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/es" element={<Home lang="es" />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<Post />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          {/* legacy Jekyll URLs */}
          <Route path="/about-me" element={<Navigate to="/about" replace />} />
          <Route path="/about-me.html" element={<Navigate to="/about" replace />} />
          <Route path="/blog" element={<Navigate to="/writing" replace />} />
          <Route path="/blog/*" element={<Navigate to="/writing" replace />} />
          <Route path="/2019/*" element={<Navigate to="/writing" replace />} />
          <Route path="/2020/*" element={<Navigate to="/writing" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
