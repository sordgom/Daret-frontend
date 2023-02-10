import React, {useState, useEffect, useContext} from "react";
import {DARET_CONTRACT_ABI,DARET_CONTRACT_ADDRESS, DARET_CONTRACT_BYTECODE} from "./constants";
import Web3 from "web3";
import {ethers} from "ethers";
import {UserContext} from '../lib/UserContext';
import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { TeamCard } from "./TeamCard";
import projImg1 from "../assets/img/nodex.png";
import projImg2 from "../assets/img/faz.png";
import projImg3 from "../assets/img/team9.png";
import projImg4 from "../assets/img/team7.png";
import projImg5 from "../assets/img/team6.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const initialList = ['0xC6A3dd9e9D73Eb3e66669534Ed21ee169aEd7f14'];
const team = [
    {
      title: "NodeX",
      description: "Founder",
      imgUrl: projImg1,

    },
    {
      title: "FazNode",
      description: "Core Team",
      imgUrl: projImg2,
    },
    {
      title: "Travis",
      description: "Core Team",
      imgUrl: projImg4,
    },   
    
    
  ];
export const CreateDaret = () => {
    let navigate = useNavigate();
    const web3 = new Web3(process.env.REACT_APP_PROVIDER_URL)

    const [list, setList] = useState(initialList);
    const [wallet, setWallet] = useState('');
    const [walletAddress, setWalletAddress] = useState();
    const [recurrence, setRecurrence] = useState(30);
    const [amount, setAmount] = useState(10);
    let provider = typeof window !== "undefined" && window.ethereum;

    // Provider
    const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", process.env.REACT_APP_API_KEY);
    // Signer
    const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, alchemyProvider);
    // Contract
    const factory = new ethers.ContractFactory(DARET_CONTRACT_ABI, DARET_CONTRACT_BYTECODE, signer);

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

    // Deploy the contract to the Ethereum network
    async function deploy() {
        try {
            let contract = await factory.deploy(recurrence, amount, list, "0x97F3C67e1c77243EA8b11cd270DDc20a2FA45Cab");
            postData('http://localhost:8080/daret', 
            {address: contract.address})
            //I can add later owner: walletAddress, amount: amount, recurrence: recurrence, list: list
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                navigate('/');
              });
        } catch (err) {
            console.log(err)
        }
    };

    async function postData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json',            
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    function handleChange(event) {
        setWallet(event.target.value);
    }

    function handleAdd() {
        if(wallet.length==0){
            return
        }
        const newList = list.concat(wallet);
        setList(newList);
    }

    function handleSubmit(e) {
        e.preventDefault();
        deploy();
    }

    useEffect(() => {
        connectMeta()
    }, []);  

    return (
        <div className="main--daret">
        <section className="daret" id="daret">
        <Container>
            <Row>
            <Col size={12}>
                <TrackVisibility>
                {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                    <center>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <h2>Create Daret</h2>
                        <div className="form-group">
                            <label htmlFor="email">Recurrence</label>
                            <input
                            type="recurrence"
                            id="recurrence"
                            name="recurrence"
                            value={recurrence}
                            onChange={(e) => setRecurrence(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                            type="amount"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="Wallet">Wallet Address</label>
                            <input
                            type="Wallet"
                            id="Wallet"
                            name="Wallet"
                            value={wallet}    
                            onChange={handleChange}/>
                        </div>
                        <button type="button" className="button"
                                onClick={handleAdd}>Add Wallet
                        </button>
                        <button type="submit">Submit
                        </button>
                    </form>
                    <p>Address List</p>
                    <ul> {
                        list.map((item, index) => (
                            <li key={index}>
                                {item}</li>
                        ))
                    } </ul>
                </center>
                </div>}
                </TrackVisibility>
            </Col>
            </Row>
        </Container>
        <img className="background-image-right" src={colorSharp2}></img>
        </section>
        </div>
)
}