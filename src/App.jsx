import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Menu from "./routes/Menu";
import Product from "./routes/Product";
import Cart from "./routes/Cart";
import Payment from "./routes/Payment";
import NotFound from "./routes/NotFound";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Confirmation from "./routes/Confirmation";
import UserPage from "./routes/UserPage";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("signedInUser")) {
      setSignedIn(true);
    }
  }, []);

  function changeSignedIn() {
    setSignedIn(!signedIn);
  }

  return (
    <Router>
      <Navbar signedIn={signedIn} changeSignedIn={changeSignedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meny" element={<Menu />} />
        <Route path="/produkter/:productId" element={<Product />} />
        <Route path="/varukorg" element={<Cart />} />
        <Route path="/betalning" element={<Payment />} />
        <Route path="/bekraftelse" element={<Confirmation />} />
        <Route
          path="/login"
          element={<Login changeSignedIn={changeSignedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/din-sida" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
