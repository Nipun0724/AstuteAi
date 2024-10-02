import { Route, Routes, useLocation } from "react-router-dom";
import HeroSection from "./components/HeroSection/HeroSection";
import Navbar from "./components/Navbar/Navbar";
import Features from "./components/Features/Features";
import Services from "./components/Services/Services";
import Slider from "./components/Slider/Slider";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Profile from "./components/Profile/Profile";
import Blogs from "./components/Blogs/Blogs";
import Products from "./components/Products/Products";
import Add_Products from "./components/Products/Add_Products";
import Generate_Blog from "./components/Blogs/Generate_Blog";
import Advertisement from "./components/Advertisements/Advertisement";
import Sign_in from "./components/Sign_in/Sign_in";
import Storyline from "./components/Storyline/Storyline";
import Testimonials from "./components/Testimonials/Testimonials";
import Logo from "./components/Profile/Logo";

function App() {
  const location = useLocation();
  const shouldShowSidebar = () => {
    const hiddenPaths = ["/", "/sign-in"];
    return !hiddenPaths.includes(location.pathname);
  };
  return (
    <div className="App" style={{ height: "100vh" }}>
      {shouldShowSidebar() && <Sidebar />}
      <div
        style={{
          marginLeft: shouldShowSidebar() ? "17%" : "0",
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="hero-background">
                <Navbar />
                <HeroSection />
                <Features />
                <Services />
                <Slider/>
                {/* <Footer /> */}
              </div>
            }
          />
          <Route path="/sign-in" element={<Sign_in />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-products" element={<Add_Products />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/generate-blogs" element={<Generate_Blog />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/generate_logo" element={<Logo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;