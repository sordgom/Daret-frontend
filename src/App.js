import React , {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { magic } from './lib/magic';
import Routes from "./Routes"; 
import { UserContext } from './lib/UserContext';

import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Testnet } from "./components/Testnet";
import { Profile } from "./components/Profile";
import { Team } from "./components/Team";
import { Footer } from "./components/Footer";
import { Projects } from "./components/Projects";
import { Work } from "./components/Login";
import { Home } from "./components/Home";

function App() {
  const [user, setUser] = useState();
 // If isLoggedIn is true, set the UserContext with user data
  // Otherwise, set it to {user: null}
  useEffect(() => {
    const storedData = localStorage.getItem('user');
    console.log(storedData)
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
   
  }, []);

  //  useEffect(() => {
  //   localStorage.setItem('user', JSON.stringify(user));
  // }, [user]);

  return (
    <div className="App">
       <UserContext.Provider value={[user, setUser]}>
          <Routes />
        </UserContext.Provider>
    </div>
  );
}

export default App;
