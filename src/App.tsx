import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import siteConfigJson from "./site.config.json";
import Home from "./pages/home";
import About from "./pages/about";
import Calendar from "./pages/calendar";
import { PageConfig } from "./types";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {siteConfigJson.pages.map((page: PageConfig) => (
            <Route
              key={page.path}
              path={page.path}
              element={pageElement(page)}
            />
          ))}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
