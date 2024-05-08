import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Verify from "./components/verify";
import Success from "./components/success";
import "./App.css";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Verify />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
