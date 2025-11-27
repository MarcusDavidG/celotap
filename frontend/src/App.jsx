import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CeloProvider } from "./context/CeloContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import SendPayment from "./components/SendPayment";
import ReceivePayment from "./components/ReceivePayment";
import MerchantMode from "./components/MerchantMode";
import "./index.css";

function App() {
  return (
    <ThemeProvider>
      <CeloProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-celo-darkBlue to-gray-900 dark:from-gray-900 dark:via-celo-darkBlue dark:to-gray-900 light:from-gray-50 light:via-blue-50 light:to-gray-100 transition-colors duration-300">
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
    </ThemeProvider>
  );
}

export default App;
