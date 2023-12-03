import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from 'components/Layout';
import { Route, Routes } from 'react-router-dom';
import './App.css';
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
import { PersistLogin } from './components/PersistLogin';
import { Profile } from './components/Profile';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';

const ROLES = {
  user: 'user',
  admin: 'admin',
};

function App() {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="*" element={<NotFound />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/help" element={<Help />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* user based routes */}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
                <Route path="/" element={<Home />} />
                <Route exact path="/daret" element={<Daret />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/create-daret" element={<CreateDaret />} />
                <Route exact path="/daretpage/:id" element={<DaretPage />} />
                <Route exact path="/completed-darets" element={<CompletedDaret />} />
                <Route exact path="/personal-darets" element={<PersonalDaret />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>

  );
}

export default App;
