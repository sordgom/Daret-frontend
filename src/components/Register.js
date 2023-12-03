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

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9]).{6,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REGISTER_URL = '/users';

export function Register() {
  const { t } = useTranslation();
  const userRef = useRef();
  const errRef = useRef();

  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const [user, setUser] = useState('test');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('test@test.com');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState('test123');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('test123');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('Registration Failed');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        {
          username: user,
          password: pwd,
          email,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      );
      setSuccess(true);
      // Set access Token & refresh Token
      console.log(response)
      const accessToken = response?.data?.access_token;
      const refreshToken = response?.data?.refresh_token;
      const roles = "user";
      setAuth({
        user, roles, accessToken, refreshToken,
      });
      localStorage.setItem('auth', JSON.stringify({
        user, roles, accessToken, refreshToken,
      }));
      // clear state and controlled inputs
      setUser('');
      setPwd('');
      setMatchPwd('');
      setEmail('');
      setErrMsg('');
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err)
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
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
      errRef.current.focus();
    }
  };

  return (
    <div className="main--daret">
      <section className="daret" id="daret">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                    <center>
                      <Form className="Register-form">
                        <h2>{t('Register')}</h2>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Email')}</Form.Label>
                          <Form.Control
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the email.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Username')}</Form.Label>
                          <Form.Control
                            type="username"
                            id="username"
                            name="username"
                            value={user}
                            ref={userRef}
                            autoComplete="off"
                            required
                            aria-invalid={validName ? 'false' : 'true'}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            onChange={(e) => setUser(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the username.')}
                          </Form.Text>
                        </Form.Group>

                        <p id="uidnote" className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                          4 to 24 characters.
                          <br />
                          Must begin with a letter.
                          <br />
                          Letters, numbers, underscores, hyphens allowed.
                        </p>

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
                            aria-invalid={validPwd ? 'false' : 'true'}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the password.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Confirm Password')}</Form.Label>
                          <Form.Control
                            type="password"
                            id="conf-password"
                            name="conf-password"
                            placeholder={t('Confirm Password')}
                            value={matchPwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? 'false' : 'true'}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the password.')}
                          </Form.Text>
                        </Form.Group>
                        <p id="confirmnote" className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}>
                          Must match the first password input field.
                        </p>

                        <button disabled={!!(!validName || !validPwd || !validMatch)} onClick={handleSubmit}>
                          {t('Sign up')}
                        </button>
                      </Form>
                      <p>
                        Already registered?
                        <br />
                        <span className="line">
                          <Link to="/login">Sign In</Link>
                        </span>
                      </p>
                    </center>

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
