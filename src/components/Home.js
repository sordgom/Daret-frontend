import React, { useContext } from 'react';
import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/money.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../lib/UserContext';
import {toast} from 'react-toastify';
  
export const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Community-powered financing for everyone", "Saving in Web3" ];
  const period = 2000;
  let navigate = useNavigate();
  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const handleClick = (e) => {
    e.preventDefault();
    if(user){
      navigate("/create-daret");
    }else{
      toast.warning('Please Login', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark"
    });
    }
  }

  return (
    <section className="banner" id="home">
  <Container>
    <Row className="align-items-center ">
      <Col xs={12} md={12} className='text-center'>
        <TrackVisibility >
          {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <span className='tagline'>{`Welcome to Daret! ⚡`} </span>
              <h4>Community-powered financing for everyone</h4>
            </div>}
        </TrackVisibility>
      </Col>
    </Row>
    <Row className="align-items-center">
      <Col xs={12} md={12} className='text-center'>
        <TrackVisibility>
          {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <h2 className="section-title">Introducing Daret</h2>

              <p className="section-description">
                Daret is a revolutionary platform that combines blockchain technology and traditional ROSCAs (Rotating Savings and Credit Associations) to create a secure, transparent, and efficient way for you to save and invest money within a trusted community.
              </p>
              <ul className="section-features">
                <li>✓ Secure and transparent transactions</li>
                <li>✓ User-friendly interface</li>
                <li>✓ Community-driven financial growth</li>
                <li>✓ Powered by blockchain technology</li>
              </ul>
            </div>}
        </TrackVisibility>
      </Col>
    </Row>
    <Row className="align-items-center">
      <Col xs={12} md={12}>
        <TrackVisibility>
          {({ isVisible }) =>
            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
              <button className="btn btn-primary btn-centered" onClick={handleClick}>Get Started</button>
            </div>}
        </TrackVisibility>
      </Col>
    </Row>
  </Container>
</section>

  
  )
}
