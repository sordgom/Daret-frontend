import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Testnet } from "./components/Testnet";
import { Profile } from "./components/Profile";
import { Team } from "./components/Team";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Projects";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Daret } from "./components/Daret";
import { Campaign } from "./components/Campaign";
import { CreateDaret } from "./components/CreateDaret";
import { DaretPage } from "./components/DaretPage";
import { Sidebar } from "./components/SideBar";

const ProjectRoutes = () => {
  return (
    <Router>
      <NavBar />
      <Sidebar />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/daret" element={<Daret />} />
        <Route exact path="/campaign" element={<Campaign />} />
        <Route exact path="/portfolio" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create-daret" element={<CreateDaret />} />      
        <Route exact path="/daretpage/:address" element={<DaretPage />} />      
      </Routes>
      <Footer />
    </Router>
  );
};

export default ProjectRoutes;
