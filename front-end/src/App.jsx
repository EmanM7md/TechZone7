import Home from "./pages/Home/Home";
import Bottomheader from "./components/headers/Bottom-header";
import Topheader from "./components/headers/Top-header";
import Cart from "./pages/Cart";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";
import Scrolltop from "./components/scrolltop";
import { AnimatePresence } from "framer-motion";
import Showproducts from "./pages/showproducts";
import Searchpage from "./pages/Searchpage";
import Favoritepage from "./pages/favoritepage";
import About from "./pages/about";
import Blog from "./pages/blog";
import Contact from "./pages/contact";
import Login from "./pages/Home/login";
import Signup from "./pages/Home/signup";
import Footer from "./components/footer";
function App() {
  return (
    <>
      <header>
        <Topheader />
        <Bottomheader />
      </header>
      <Scrolltop />

      {/* toaster library  */}
      <Toaster
        position="buttom-right"
        toastOptions={{
          style: {
            background: "#f2f2f2",
            borderRadius: "4px",
            padding: "16px",
          },
        }}
      />
        <AnimatePresence mode="wait">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/search" element={<Searchpage />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/favorite" element={<Favoritepage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path={'/products/category/:category'}  element={<Showproducts />} />
      </Routes>
        </AnimatePresence>
        <Footer />
    </>
  );
}

export default App;