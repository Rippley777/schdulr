import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<div className="text-3xl font-bold underline">Home</div>}
        />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </Router>
  );
}

export default App;
