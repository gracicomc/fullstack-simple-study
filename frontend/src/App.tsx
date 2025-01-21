import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/LoginPage";
// import { Register } from "./pages/Register";
import { Home } from "./pages/HomePage"; // Vamos criar uma página simples de home
import SignUp from "./pages/SignUpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
