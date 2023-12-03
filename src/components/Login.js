import 'animate.css';
import { useEffect, useRef, useState } from 'react';
import {
  Col, Container, Form, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TrackVisibility from 'react-on-screen';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

export function Login() {
  const { t } = useTranslation();
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('test');
  const [pwd, setPwd] = useState('test123');
  const [errMsg, setErrMsg] = useState('Login Failed');

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        '/users/login',
        {
          username: user,
          password: pwd,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const accessTokenExpiresAt = response?.data?.access_token_expired_at;
      const refreshTokenExpiresAt = response?.data?.refresh_token_expired_at;
      const sessionId = response?.data?.session_id;
      const roles = response?.data?.role;
      setAuth({
        accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, sessionId, roles
      });
      localStorage.setItem('auth', JSON.stringify({
        accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, sessionId, roles
      }));
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      toast.warning(errMsg, {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem('persist', persist);
  }, [persist]);

  return (
    <div className="main--daret">
      <section className="daret" id="daret">
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                    <center>
                      <Form className="login-form">
                        <h2>{t('Login')}</h2>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Username')}</Form.Label>
                          <Form.Control
                            type="username"
                            id="username"
                            name="username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            ref={userRef}
                            autoComplete="off"
                            required
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the username.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Password')}</Form.Label>
                          <Form.Control
                            type="password"
                            id="password"
                            name="password"
                            placeholder={t('Password')}
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the password.')}
                          </Form.Text>
                        </Form.Group>
                        <div className="persistCheck">
                          <input
                            type="checkbox"
                            id="persist"
                            onChange={togglePersist}
                            checked={persist}
                          />
                          <label htmlFor="persist">Trust This Device</label>
                        </div>
                        <button type="submit" onClick={handleSubmit}>
                          {t('Sign in')}
                        </button>

                      </Form>

                    </center>
                    <p>
                      Need an Account?
                      <br />
                      <span className="line">
                        <Link to="/register">Sign Up</Link>
                      </span>
                    </p>
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
