import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SuccessPage from "./pages/SuccessPage";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
