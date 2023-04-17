import React from 'react';
import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";
import projImg1 from "../assets/img/nodex.png";
import projImg2 from "../assets/img/faz.png";
import projImg3 from "../assets/img/team9.png";
import projImg4 from "../assets/img/team7.png";
import projImg5 from "../assets/img/team6.png";
import {UserContext} from '../lib/UserContext';
import Web3 from "web3";
import {magic} from "../lib/magicConnect";


export const Profile = () => {
  const web3 = new Web3(magic.rpcProvider);
  const [balance, setBalance] = useState(0);
  const [walletInfo, setWalletInfo] = useState('-');
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    if(user){
      getBalance();
      getInfo();  
    }
  }, [user]);

  const getBalance = async () => {
    await web3.eth.getBalance(user).then((res) => {
      setBalance(res/1000000000000000000);
    }).catch((error) => {
      console.log(error);
    });
  } 
  
  const getInfo = async () => {
    await magic.connect.getWalletInfo().then((res) => {
      console.log(res)
      setWalletInfo(res.walletType);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="main--portfolio">
      <section className="portfolio" id="portfolio">
        <Container>
        <Row>
            <Col size={12}>
              <TrackVisibility>
                <div className="">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Attributes</th>
                          <th>Values</th>
                        </tr>
                      </thead>
                      {!!user &&
                        <tbody>
                          <tr>
                            <td>Wallet Address</td>
                            <td>{user}</td>
                          </tr>
                          <tr>
                            <td>Balance</td>
                            <td>{balance} ETH</td>
                          </tr>
                          <tr>
                            <td>Wallet Info</td>
                            <td>{walletInfo}</td>
                          </tr>
                        </tbody>
                      }
                    </table>
                  
                </div>
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className="">
                    <img src={projImg3} alt="Header Img"/>
                  </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
