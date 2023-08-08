// React imports
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Component imports
import Header from "./Components/Header";

// Page imports
import Homepage from "./pages/Homepage";
import CategorySelection from "./pages/CategorySelection";
import QuizConfigurator from "./pages/QuizConfigurator";
import QuizQuestions from "./pages/QuizQuestions";

// Context imports
import TriviaContextProvider from "./context/TriviaContext";

function App() {
  return (
    <TriviaContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/categories" element={<CategorySelection />} />
          <Route path="/personalize" element={<QuizConfigurator />} />
          <Route path="/quizzical" element={<QuizQuestions />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </Router>
    </TriviaContextProvider>
  );
}

export default App;
