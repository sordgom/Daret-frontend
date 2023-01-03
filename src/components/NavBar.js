import React from 'react';
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from '../assets/img/logo.svg';
import navIcon1 from '../assets/img/twitter.svg';
import navIcon2 from '../assets/img/github.svg';
import navIcon3 from '../assets/img/discord.svg';
import navIcon4 from '../assets/img/youtube.svg';
import loginIcon from '../assets/img/login.svg';
import { HashLink } from 'react-router-hash-link';
import { Profile } from '../components/Profile';
import headerImg from "../assets/img/celestia.png";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

//TODO: Add a scroll listener to the navbar to change the background color when scrolled

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

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
              <Nav.Link href="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link href="daret" className={activeLink === 'daret' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('daret')}>Darets</Nav.Link>
              <Nav.Link href="campaign" className={activeLink === 'campaign' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('campaign')}>Campaigns</Nav.Link>
              <Nav.Link href="portfolio" className={activeLink === 'portfolio' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('portfolio')}>Portfolio</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <div className="social-icon">
                <a href="login" target="_blank"><img src={loginIcon} alt="Login" /></a>
              </div>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>    
  )
}
