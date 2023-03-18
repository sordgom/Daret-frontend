import React, {useState, useEffect, useContext} from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/twitter.svg';
import navIcon2 from '../assets/img/github.svg';
import navIcon3 from '../assets/img/discord.svg';
import navIcon4 from '../assets/img/youtube.svg';
import loginIcon from '../assets/img/login.svg';
import { HashLink } from 'react-router-hash-link';
import { Profile } from '../components/Profile';
import headerImg from "../assets/img/daret-logo-removebg-preview.png";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Web3 from "web3";
import {UserContext} from '../lib/UserContext';
import {magic} from "../lib/magicConnect";

export const NavBar = () => {
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
    web3.eth.getAccounts().then((accounts) => {
        user = accounts ?. [0];
        setUser(user);
    }).then(() => {
        localStorage.setItem('user', JSON.stringify(user));
        navigate("/");
    }).catch((error) => {
        console.log(error);
    });
  };

  const showWallet = async () => {
    await magic.connect.showWallet().catch((e) => {
        console.log(e);
    });
  };

  const disconnect = async () => {
    await magic.connect.disconnect().catch((e) => {
        console.log(e);
    });
    localStorage.removeItem('user');
    setUser(null);
    navigate("/");
};


  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
          <img src={headerImg} alt="Header Img"/> 
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
              <NavDropdown title="Login" id="login-dropdown">
                <NavDropdown.Item onClick={login}>Sign in</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/profile">View profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={showWallet}>Show wallet</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={disconnect}>Sign out</NavDropdown.Item>
              </NavDropdown>  
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>    
  )
}
