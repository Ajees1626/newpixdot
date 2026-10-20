import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import CustomCursor from "@/components/layout/Cursor/CustomCursor";
import Loader from "@/components/layout/Loader/Loader";
import BrandRouteTransition from "@/components/layout/Animations/BrandRouteTransition";
import SmoothScroll from "@/components/layout/SmoothScroll/SmoothScroll";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  const [loading, setLoading] = useState(() => !sessionStorage.getItem("pixdot-visited"));
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("pixdot-visited", "1");
    setLoading(false);
  };

  return (
    <SmoothScroll>
      {loading && <Loader onComplete={handleLoaderComplete} />}
      {!loading && <BrandRouteTransition />}
      <div className={loading ? "invisible" : "visible"}>
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
      <CustomCursor />
    </SmoothScroll>
  );
}
