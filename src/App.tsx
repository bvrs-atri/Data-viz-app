import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { TopNav } from "./components/TopNav";
import ChartPage from "./pages/ChartPage";
import TablePage from "./pages/TablePage";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <TopNav />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<TablePage />} />
            <Route path="/charts" element={<ChartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
