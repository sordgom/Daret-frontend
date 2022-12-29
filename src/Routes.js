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
import { Work } from "./components/Work";
import { Home } from "./components/Home";

const ProjectRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/work" element={<Work />} />      
      </Routes>
    </Router>
  );
};

export default ProjectRoutes;
