import React, {useState, useEffect, useContext} from "react";
import {CAMPAIGN_CONTRACT_ABI, CAMPAIGN_CONTRACT_ADDRESS, CAMPAIGN_CONTRACT_BYTECODE} from "../constants";
import Web3 from "web3";
import {UserContext} from '../../lib/UserContext';
import {Container, Row, Col, Button} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import 'animate.css';
import {magic} from '../../lib/magicConnect';


export const CampaignPage = () => {
    let {id} = useParams();
    const web3 = new Web3(magic.rpcProvider);
    const [user, setUser] = useContext(UserContext);

    const [wallet, setWallet] = useState('');
    const [walletAddress, setWalletAddress] = useState();
    const [recurrence, setRecurrence] = useState(30);
    const [amount, setAmount] = useState(10);
    const [data, setData] = useState([]);
    let provider = typeof window !== "undefined" && window.ethereum;

    const contract = new web3.eth.Contract(CAMPAIGN_CONTRACT_ABI, CAMPAIGN_CONTRACT_ADDRESS, {from: user});

    useEffect(() => {
        getProperties();
    }, [user]);

    const getProperties = async () => {
        try {
            let a = await contract.methods.campaigns(id).call();
            setData(a)
        } catch (error) {
            console.error(error);
        }
    };

    const pledge = async () => {
        try {
            await contract.methods.pledge(id).send({from: user, value: 1}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
        } catch ({error}) {
            console.log(error ?. reason);
        }
    };

    const unpledge = async () => {
        try {
            await contract.methods.unpledge(id).send({from: user, value: 1}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
        } catch ({error}) {
            console.log(error ?. reason);
        }
    };

    const refund = async () => {
        try {
            await contract.methods.refund(id).send({from: user}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
        } catch ({error}) {
            console.log(error ?. reason);
        }
    };

    const claim = async () => {
        try {
            await contract.methods.claim(id).send({from: user}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
        } catch ({error}) {
            console.log(error ?. reason);
        }
    };


    const cancel = async () => {
        try {
            await contract.methods.cancel(id).send({from: user}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="main--campaign">
            <section className="campaign" id="campaign">
                <Container>
                    <Row>
                        <Col size={12}>
                            <div className="">
                                <h3>Campaign</h3>
                                <p className="text--primary">
                                    {id}</p>
                                <button onClick={pledge}>
                                    Pledge
                                </button>
                                <button onClick={unpledge}>
                                    Unpledge
                                </button>
                                <button onClick={refund}>
                                    Refund
                                </button>
                                <button onClick={claim}>
                                    Claim
                                </button>
                                <button onClick={cancel}>
                                    Cancel
                                </button>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Property</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Claimed</td>
                                            <td>{
                                                data.claimed ? 'Yes' : 'No'
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>Creator</td>
                                            <td>{
                                                data.creator
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>End At</td>
                                            <td>{
                                                data.endAt
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>Goal</td>
                                            <td>{
                                                data.goal
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>Pledged</td>
                                            <td>{
                                                data.pledged
                                            }</td>
                                        </tr>
                                        <tr>
                                            <td>Start At</td>
                                            <td>{
                                                data.startAt
                                            }</td>
                                        </tr>
                                    </tbody>
                                </table>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}
