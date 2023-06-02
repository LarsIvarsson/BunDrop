import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import Payment from "./routes/Payment";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meny" element={<Menu />} />
        <Route path="/produkter/:productId" element={<Product />} />
        <Route path="/varukorg" element={<Cart />} />
        <Route path="/betalning" element={<Payment />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
