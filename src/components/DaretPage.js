import React, {useState, useEffect, useContext} from "react";
import {DARET_CONTRACT_ABI,DARET_CONTRACT_ADDRESS, DARET_CONTRACT_BYTECODE} from "./constants";
import Web3 from "web3";
import {ethers} from "ethers";
import { UserContext } from '../lib/UserContext';
import { Container, Row, Col, Button } from "react-bootstrap";
import headerImg from "../assets/img/2.png";
import { ArrowRightCircle, Quote } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {NavBar} from "./NavBar";
import {Footer} from "./Footer";


export const DaretPage = () => {
  let { address } = useParams();
  const web3 = new Web3(process.env.REACT_APP_PROVIDER_URL)

  const [walletAddress, setWalletAddress] = useState('');
  const [round, setRound] = useState(null);
  
  let provider = typeof window !== "undefined" && window.ethereum;

  // Provider
  const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", process.env.REACT_APP_API_KEY);
  // Signer
  const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, alchemyProvider);
  // Contract
  const contract = new ethers.Contract(address, DARET_CONTRACT_ABI, signer);

  let a ;

  useEffect(() => {
        getProperties();
        connectMeta();
    }, []); 

    const getProperties = async () => {
        try {
            let a = await contract.rounds(1);
            setRound(a);
        } catch (error) {
            console.error(error);
        }
    };

    const start = async () => {
      try {
        await contract.startRound().then((res) => {
          console.log(res);
        });
      } catch ({error}) {
        console.log(error?.reason);
      }
    };

    const join  = async () => {
      try {
        await contract.joinRound();
      } catch ({error}) {
        console.log(error?.reason);
      }
    };

    const contribute  = async () => {
      try {
        await contract.addContribution();
      } catch (error) {
        console.log(error);
      }
    };

    const complete  = async () => {
      try {
        await contract.completeRound();
      } catch (error) {
        console.log(error);
      }
    };

    const close  = async () => {
      try {
        await contract.closeContract();
      } catch (error) {
        console.log(error);
      }
    };

  const connectMeta = async () => {
      try {
          if (! provider) 
              return alert("Please Install MetaMask");
          
          const accounts = await provider.request({method: "eth_requestAccounts"});

          if (accounts.length) {
              setWalletAddress(accounts[0]);
          }
      } catch (error) {
          console.error(error);
      }
  };

 

  return (
    <div className="main--campaign">
      <section className="campaign" id="campaign">
        <Container>
        <Row>
            <Col size={12}>
                <div className="">
                    <h3>Daret</h3>
                    <p className="text--primary">{address}</p>
                    <Button onClick={start}>
                        Start Round
                    </Button>
                    <Button onClick={join}>
                        Join Round
                    </Button>
                    <Button onClick={contribute}>
                        Contribute
                    </Button>
                    <Button onClick={close}>
                        Close Round
                    </Button>
                    <Button onClick={complete}>
                        Complete Round
                    </Button>
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
