import React , {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./Routes"; 
import { UserContext } from './lib/UserContext';

function App() {
  const [user, setUser] = useState();
 
  useEffect(() => {
    const storedData = localStorage.getItem('user');
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
