import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Document from "./pages/Document";
import DragnDrop from "./pages/DragnDrop";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/document" element={<Document />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dragndrop" element={<DragnDrop />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
