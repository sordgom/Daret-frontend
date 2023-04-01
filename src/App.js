import React , {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./Routes"; 
import { UserContext } from './lib/UserContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const [user, setUser] = useState();
 
  useEffect(() => {
    const storedData = localStorage.getItem('user');
    if (storedData) {
      setUser(JSON.parse(storedData));
    }
   
  }, []);

  return (
    <div className="App">
      <ToastContainer />
       <UserContext.Provider value={[user, setUser]}>
          <Routes />
        </UserContext.Provider>
    </div>
  );
}

export default App;
