import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CeloProvider } from "./context/CeloContext";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SendPayment from "./components/SendPayment";
import ReceivePayment from "./components/ReceivePayment";
import MerchantMode from "./components/MerchantMode";
import "./index.css";

function App() {
  return (
    <CeloProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-celo-darkBlue to-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/send" element={<SendPayment />} />
            <Route path="/receive" element={<ReceivePayment />} />
            <Route path="/merchant" element={<MerchantMode />} />
          </Routes>
        </div>
      </Router>
    </CeloProvider>
  );
}

export default App;
