import React, {useState, useEffect, useContext} from "react";
import {DARET_CONTRACT_ABI,DARET_CONTRACT_ADDRESS, DARET_CONTRACT_BYTECODE} from "../constants";
import Web3 from "web3";
import {ethers} from "ethers";
import {UserContext} from '../../lib/UserContext';
import {useNavigate} from "react-router-dom";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { TeamCard } from "../TeamCard";
import projImg1 from "../../assets/img/nodex.png";
import projImg2 from "../../assets/img/faz.png";
import projImg3 from "../../assets/img/team9.png";
import projImg4 from "../../assets/img/team7.png";
import projImg5 from "../../assets/img/team6.png";
import colorSharp2 from "../../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import {magic} from '../../lib/magicConnect';

const initialList = ['0xC6A3dd9e9D73Eb3e66669534Ed21ee169aEd7f14'];

export const CreateDaret = () => {
    let navigate = useNavigate();
    const web3 = new Web3(magic.rpcProvider);

    const [user, setUser] = useContext(UserContext);
    const [list, setList] = useState(initialList);
    const [wallet, setWallet] = useState('');
    const [maxRounds, setMaxRounds] = useState(10);
    const [maxMembers, setMaxMembers] = useState(10);
    const [feePercentage, setFeePercentage] = useState(1);
    const [admin, setAdmin] = useState('0xC6A3dd9e9D73Eb3e66669534Ed21ee169aEd7f14');

    // Contract
    const contract = new web3.eth.Contract(  DARET_CONTRACT_ABI, { from: user });

    // Deploy the contract to the Ethereum network
    async function deploy() {
        try {  
            await contract.deploy({
                data: DARET_CONTRACT_BYTECODE,
                arguments: [maxRounds, maxMembers, feePercentage,  admin]
            })
            .send({
                from: user
            })
            .then(function(newContractInstance){
                console.log(newContractInstance.options.address) // instance with the new contract address
                postData('http://localhost:8080/daret', 
                {address: newContractInstance.options.address})
                //I can add later owner: walletAddress, amount: amount, maxRounds: maxRounds, list: list
                .then((data) => {
                    console.log(data); // JSON data parsed by `data.json()` call
                    navigate('/');
                  });
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

    function handleSubmit(e) {
        e.preventDefault();
        deploy();
    }

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
                            <label htmlFor="email">Rounds</label>
                            <input
                            type="maxRounds"
                            id="maxRounds"
                            name="maxRounds"
                            value={maxRounds}
                            onChange={(e) => setMaxRounds(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="maxMembers">Members</label>
                            <input
                            type="maxMembers"
                            id="maxMembers"
                            name="maxMembers"
                            value={maxMembers}
                            onChange={(e) => setMaxMembers(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="feePercentage">Fee Percentage</label>
                            <input
                            type="feePercentage"
                            id="feePercentage"
                            name="feePercentage"
                            value={feePercentage}    
                            onChange={(e) => setFeePercentage(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="admin">Admin Account</label>
                            <input
                            type="admin"
                            id="admin"
                            name="admin"
                            value={admin}    
                            onChange={(e) => setAdmin(e.target.value)}
                            />
                        </div>
                     
                        <button type="submit">Submit
                        </button>
                    </form>
                  
                </center>
                </div>}
                </TrackVisibility>
            </Col>
            </Row>
        </Container>
        </section>
        </div>
)
}
