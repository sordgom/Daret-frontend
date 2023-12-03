import 'animate.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TrackVisibility from 'react-on-screen';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

export function Home() {
  const { t } = useTranslation();
  const { auth } = useAuth();
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    t('Community-powered financing for everyone'),
  ];
  const period = 2000;
  const navigate = useNavigate();
  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [text]);

  const tick = () => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (auth) {
      navigate('/create-daret');
    } else {
      toast.warning('Please Login', {
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

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center ">
          <Col xs={12} md={12} className="text-center">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <span className="tagline">
                    {`${t('Welcome to Daret!')} ⚡`}
                    {' '}
                  </span>
                  {/* <h4>{text}</h4> */}
                  <h4>{t('Community-powered financing for everyone')}</h4>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={12} md={12} className="text-center">
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <h2 className="section-title">{t('Introducing Daret')}</h2>

                  <p className="section-description">
                    {t('Daret is a revolutionary platform that brings traditional ROSCAs (Rotating Savings and Credit Associations) to create a secure, transparent, and efficient way for you to save and invest money within a trusted community.')}
                  </p>
                  <ul className="section-features">
                    <li>{t('✓ Secure and transparent transactions')}</li>
                    <li>{t('✓ User-friendly interface')}</li>
                    <li>{t('✓ Community-driven financial growth')}</li>
                  </ul>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
        <Row className="align-items-center">
          <Col xs={12} md={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                  <button className="btn btn-primary btn-centered" onClick={handleClick}>{t('Get Started')}</button>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
