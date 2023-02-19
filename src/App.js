import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Podcasts from "./pages/Podcasts/Podcasts";
import AddPodcast from "./pages/AddPodcast/AddPodcast";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
import IndividualPodcast from "./pages/IndividualPodcast/IndividualPodcast";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/podcasts/podcast/:id" element={<IndividualPodcast />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/add" element={<AddPodcast />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;