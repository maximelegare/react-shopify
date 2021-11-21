import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/products/:handle" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
