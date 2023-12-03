import { useEffect, useState } from 'react';
import {
  Container, Nav, NavDropdown,
  Navbar
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import headerImg from '../assets/img/daret-logo-removebg-preview.png';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

export function NavBar() {
  const { t, i18n } = useTranslation();
  const logout = useLogout();
  const { auth } = useAuth();

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <Navbar expand="md" className={scrolled ? 'scrolled' : ''}>
      <Container>
        <Navbar.Brand href="/">
          <img style={{ width: '150%' }} src={headerImg} alt="Header Img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{t('Home')}</Nav.Link>
            <Nav.Link as={Link} to="/help" className={activeLink === 'help' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('help')}>{t('How it works')}</Nav.Link>
            <NavDropdown title="Darets" id="daret-dropdown" className="dropdown-toggle text-center">
              <NavDropdown.Item as={Link} to="/create-daret">{t('Create Daret')}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/daret">{t('Active Darets')}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/completed-darets">{t('Completed Darets')}</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Language" id="dropdownMenuButton" className="dropdown-toggle text-center">
              <NavDropdown.Item onClick={() => handleLanguageChange('en')} style={{ color: '#000', fontSize: '18px', fontWeight: '400' }}>English</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleLanguageChange('fr')} style={{ color: '#000', fontSize: '18px', fontWeight: '400' }}>French</NavDropdown.Item>
            </NavDropdown>

            { !auth || Object.keys(auth).length == 0 ? (
              <NavDropdown title="Login" id="login-dropdown" className="dropdown-toggle text-center">
                <NavDropdown.Item as={Link} to="/login">{t('Sign in')}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/register">{t('Sign up')}</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Profile" id="profile-dropdown" className="dropdown-toggle text-center">
                <NavDropdown.Item as={Link} to="/profile">{t('Profile')}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={signOut}>{t('Sign out')}</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
