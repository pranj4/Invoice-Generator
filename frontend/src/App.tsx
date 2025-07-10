// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login"; // you can create a placeholder for now
import AddProducts from "./pages/AddProducts";

// inside <Routes>

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AddProducts" element={<AddProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
