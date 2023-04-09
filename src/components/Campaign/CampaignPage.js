import React, {useState, useEffect, useContext, useMemo} from "react";
import {CAMPAIGN_CONTRACT_ABI, CAMPAIGN_CONTRACT_ADDRESS, CAMPAIGN_CONTRACT_BYTECODE} from "../constants";
import Web3 from "web3";
import {UserContext} from '../../lib/UserContext';
import {Container, Row, Col, Button} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import 'animate.css';
import {magic} from '../../lib/magicConnect';
import {toast} from 'react-toastify';
import {Table, Card} from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const CampaignTable = ({data, goal, duration, pledgedAmount}) => {
    return (
        <Card className="info-table-card">
            <Card.Header>
                <h5>Crowdfund Information</h5>
            </Card.Header>
            <Card.Body>
                <Table responsive="sm" bordered hover className="info-table">
                    <tbody>
                        <tr>
                            <th>Property</th>
                            <th>Value</th>
                        </tr>

                        <tr>
                            <td>Title:</td>
                            <td>{
                                data[0] ?. title
                            }</td>
                        </tr>

                        <tr>
                            <td>Description:</td>
                            <td>{
                                data[0] ?. description
                            }</td>
                        </tr>

                        <tr>
                            <td>Goal:</td>
                            <td>{goal}</td>
                        </tr>


                        <tr>
                            <td>Time left:</td>
                            <td>{duration} days</td>
                        </tr>

                        <tr>
                            <td>Pledged amount:</td>
                            <td>{pledgedAmount}</td>
                        </tr>

                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export const CampaignPage = () => {
    let {address} = useParams();
    const web3 = new Web3(magic.rpcProvider);
    const [user, setUser] = useContext(UserContext);
    const [amount, setAmount] = useState(10);
    const [data, setData] = useState([]);
    const [goal, setGoal] = useState(0);
    const [duration, setDuration] = useState(0);
    const [pledgedAmount, setPledgedAmount] = useState(0);
    const [owner, setOwner] = useState('');

    const contract = useMemo(() => new web3.eth.Contract(CAMPAIGN_CONTRACT_ABI, address, {from: user}), [web3.eth.Contract, address, user]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/campaign/' + address);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPledgedAmount = async () => {
        try {
            const pledged = await contract.methods.pledged().call();
            setPledgedAmount(pledged);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOwner = async () => {
        try {
            const contractOwner = await contract.methods.creator().call();
            setOwner(contractOwner);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGoal = async () => {
        try {
            const goal = await contract.methods.goal().call();
            setGoal(goal);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDuration = async () => {
        try {
            const end = await contract.methods.endAt().call();
            const start = await contract.methods.startAt().call();
            const currentTime = Math.floor(Date.now() / 1000);
            const remainingDuration = Math.floor((end - currentTime) / 86400);
            
            console.log(remainingDuration)
            // Check if the remaining duration is negative and the campaign is not marked as completed
            if (remainingDuration < 0 && data[0]?.completed === 0) {
                // Update the completed variable in the database
                console.log(1)
                await putData("http://localhost:8080/campaign/" + address, {
                    completed: 1,
                });
            }
    
            setDuration(remainingDuration);
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        if (!user) 
            return;
        
        (async () => {
            try {
                await fetchData();
                await fetchPledgedAmount();
                await fetchOwner();
                await fetchGoal();
                await fetchDuration();
            } catch (error) {
                console.error(error);
            }
        })();
    }, [user]);

    const pledge = async () => {
        try {
            await contract.methods.pledge().send({from: user, value: amount}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
            toast.success('Successfully joined the crowdfund!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } catch ({error}) {
            toast.error(error ?. reason, {
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
    };

    const claim = async () => {
        try {
            await contract.methods.claim().send({from: user}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
            toast.success('Successfully completed the daret!', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        } catch (error) {
            toast.error(error.message, {
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
    };

    async function putData(url = '', data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          headers: {
            'Content-Type': 'application/json',            
          },
          body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    return (
        <div className="main--daret">
            <section className="daret" id="daret">
                <Container>
                    <Row>
                        <Col size={12}>
                            <div className=""
                                style={
                                    {'margin-top': '60px'}
                            }>
                                {
                                data && goal && duration && pledgedAmount && <CampaignTable data={data}
                                    goal={goal}
                                    duration={duration}
                                    pledgedAmount={pledgedAmount}/>
                            } </div>
                            <div className=""
                                style={
                                    {'margin-bottom': '60px'}
                            }>

                                {
                                owner === user && (
                                    <Row>
                                        <button onClick={claim}>Claim</button>
                                    </Row>
                                )
                            }
                                <Row>
                                    <Col>
                                        <button  style={{'width': '60%'}} onClick={pledge}>Pledge</button>
                                    </Col>
                                    <Col>
                                        <Form.Group className="form-group" style={{'width': '60%'}}>
                                            <Form.Label>Pledged amount</Form.Label>
                                            <Form.Control type="pledgedAmount" id="pledgedAmount" name="pledgedAmount"
                                                value={amount}
                                                onChange={
                                                    (e) => setAmount(e.target.value)
                                                }/>
                                            <Form.Text className="text-muted">
                                                Please enter the amount pledged.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};
