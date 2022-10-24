import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ServicesTab from "./components/ServicesTab";
import Confirmation from "./pages/Confirmation";
import Home from "./pages/Home";
import TransactionConfirmed from "./pages/TransactionConfirmed";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ServicesTab />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/confirm" element={<Confirmation />} />
          <Route path="/successfull" element={<TransactionConfirmed />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
