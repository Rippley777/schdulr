import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import siteConfigJson from "./site.config.json";
import Home from "./pages/home";
import About from "./pages/about";
import Calendar from "./pages/calendar";

import { PageConfig } from "./types";

function App() {
  const pageElement = (page: PageConfig) => {
    switch (page.title) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "Calendar":
        return <Calendar />;
      default:
        return <Home />;
    }
  };

  return (
    <Router>
      <Routes>
        {siteConfigJson.pages.map((page: PageConfig) => (
          <Route key={page.path} path={page.path} element={pageElement(page)} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
