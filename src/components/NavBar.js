import React, {useState, useEffect, useContext} from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import headerImg from "../assets/img/daret-logo-removebg-preview.png";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Web3 from "web3";
import {UserContext} from '../lib/UserContext';
import {magic} from "../lib/magicConnect";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from "react-i18next";

export const NavBar = () => {
  const { t, i18n } = useTranslation();

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const web3 = new Web3(magic.rpcProvider);

  let navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  const login = async () => {
    let user;
    let acc = await web3.eth.requestAccounts();
    console.log(acc);
    web3.eth.getAccounts().then((accounts) => {
      
      
        user = accounts ?. [0];
        setUser(user);
    }).then(() => {
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Login successful', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        navigate("/");
    }).catch((error) => {
        console.log(error);
    });
  };

  const showWallet = async () => {
    await magic.connect.showWallet()
      .then(() => {
        console.log("showWallet function worked successfully!");
      }).catch((e) => {
      console.log(e);
      toast.error("Not Logged in or your wallet isn't magic wallet", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    });
  };

  const disconnect = async () => {
    await magic.connect.disconnect().catch((e) => {
        console.log(e);
    });
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout successful', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    navigate("/");
};

const handleLanguageChange = (lang) => {
  i18n.changeLanguage(lang);
};
  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
          <img style={{'width':'150%'}}src={headerImg} alt="Header Img"/> 
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <NavDropdown title="Darets" id="daret-dropdown">
                <NavDropdown.Item as={Link} to="/create-daret">Create Daret</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/daret">Active Darets</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/completed-darets">Completed Darets</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Crowdfunds" id="campaign-dropdown">
                <NavDropdown.Item as={Link} to="/create-campaign">Create Crowdfund</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/campaign">Active Crowdfunds</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/completed-campaign">Completed Crowdfund</NavDropdown.Item>
              </NavDropdown> 
              
              <Nav.Link as={Link} to="/help" className={activeLink === 'help' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('help')}>How it works</Nav.Link>
              <div>
                {!user && 
                <button title="sign in" id="login-dropdown" onClick={login}>Sign in</button>
                }{user && 
                  <NavDropdown title="Account" id="login-dropdown">
                    <NavDropdown.Item as={Link} to="/profile">View profile</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/personal-darets">Personal Darets</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={showWallet}>Show wallet</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={disconnect}>Sign out</NavDropdown.Item>
                  </NavDropdown>
                }
              </div>
                
              <NavDropdown title="Language" id="dropdownMenuButton" className="dropdown-toggle text-center" >
                <NavDropdown.Item onClick={() => handleLanguageChange('en')} style={{ color: '#000', fontSize: '18px', fontWeight: '400' }}>English</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleLanguageChange('fr')} style={{ color: '#000', fontSize: '18px', fontWeight: '400' }}>French</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>    
  )
}
