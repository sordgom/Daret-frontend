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


export const CampaignPage = () => {
  let { address } = useParams();
  const web3 = new Web3(process.env.REACT_APP_PROVIDER_URL)

  const [wallet, setWallet] = useState('');
  const [walletAddress, setWalletAddress] = useState();
  const [recurrence, setRecurrence] = useState(30);
  const [amount, setAmount] = useState(10);
  let provider = typeof window !== "undefined" && window.ethereum;

  // Provider
  const alchemyProvider = new ethers.providers.InfuraProvider(
    process.env.REACT_APP_ETHEREUM_NETWORK,
    process.env.REACT_APP_API_KEY
  );  // Signer
  const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, alchemyProvider);
  // Contract
  const contract = new ethers.Contract(address, DARET_CONTRACT_ABI, signer);

  let a ;

  useEffect(() => {
        getProperties();
    }, []); 

    const getProperties = async () => {
        try {
            let a = await contract.amount();
            setAmount(a.toNumber());
            let r = await contract.recurrence();
            setRecurrence(r.toNumber());
            let w = await contract.wallets(0);
            setWallet(w);
        } catch (error) {
            console.error(error);
        }
    };

    const pay = async () => {
      try {
        await contract.pay();
      } catch ({error}) {
        console.log(error?.reason);
      }
    };

    const reward  = async () => {
      try {
        await contract.reward();
      } catch ({error}) {
        console.log(error?.reason);
      }
    };

    const endDaret  = async () => {
      try {
        await contract.endDaret();
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

  useEffect(() => {
    connectMeta();
    }, []);

  return (
    <div className="main--campaign">
      <section className="campaign" id="campaign">
        <Container>
        <Row>
            <Col size={12}>
                <div className="">
                    <h3>Campaign</h3>
                    <p className="text--primary">{address}</p>
                    <Button onClick={reward}>
                        Reward
                    </Button>
                    <Button onClick={pay}>
                        Pay
                    </Button>
                    <Button onClick={endDaret}>
                      End Daret
                    </Button>
                   
                </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}
