import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import { NavBar } from "./components/NavBar";
import { Profile } from "./components/Profile";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Daret } from "./components/Daret";
import { Campaign } from "./components/Campaign";
import { CreateDaret } from "./components/CreateDaret";
import { DaretPage } from "./components/DaretPage";
import { Sidebar } from "./components/SideBar";
import { CreateCampaign } from "components/CreateCampaign";
import { CampaignPage } from "./components/CampaignPage";


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
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/create-daret" element={<CreateDaret />} />      
        <Route exact path="/create-campaign" element={<CreateCampaign />} />      
        <Route exact path="/daretpage/:address" element={<DaretPage />} />     
        <Route exact path="/campaignpage/:id" element={<CampaignPage />} />      
      </Routes>
      <Footer />
    </Router>
  );
};

export default ProjectRoutes;
