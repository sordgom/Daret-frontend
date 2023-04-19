import React , {useState, useEffect} from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from "./Routes"; 
import { UserContext } from './lib/UserContext';
import { ToastContainer } from 'react-toastify';
import { I18nextProvider } from "react-i18next";
import i18n from './i18n.js';


function App() {
  const [user, setUser] = useState(null);

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
        <I18nextProvider i18n={i18n}>
          <Routes />
        </I18nextProvider>
        </UserContext.Provider>
    </div>
  );
}

export default App;
