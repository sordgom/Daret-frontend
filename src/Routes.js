import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { CompletedDaret } from './components/Daret/CompletedDaret';
import { CreateDaret } from './components/Daret/CreateDaret';
import { Daret } from './components/Daret/Daret';
import { DaretPage } from './components/Daret/DaretPage';
import { PersonalDaret } from './components/Daret/PersonalDaret';
import { Footer } from './components/Footer';
import { Help } from './components/Help';
import { Home } from './components/Home';
import { Login } from './components/Login';
import { NavBar } from './components/NavBar';
import NotFound from './components/NotFound';
import { Profile } from './components/Profile';
import { Register } from './components/Register';

function ProjectRoutes() {
  return (
    <Router>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route exact path="/daret" element={<Daret />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route exact path="/create-daret" element={<CreateDaret />} />
          <Route exact path="/daretpage/:address" element={<DaretPage />} />
          <Route exact path="/completed-darets" element={<CompletedDaret />} />
          <Route exact path="/personal-darets" element={<PersonalDaret />} />
          <Route exact path="/help" element={<Help />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default ProjectRoutes;
