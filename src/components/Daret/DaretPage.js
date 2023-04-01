import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useMemo
} from "react";
import {DARET_CONTRACT_ABI} from "../constants";
import Web3 from "web3";
import {magic} from '../../lib/magicConnect';
import {UserContext} from '../../lib/UserContext';
import {Container, Row, Col} from "react-bootstrap";
import {useParams, useNavigate} from 'react-router-dom';
import 'animate.css';
import {toast} from 'react-toastify';
import {Table, Card} from "react-bootstrap";

const DaretTable = ({
    round,
    maxMembers,
    members,
    contribution,
    data
}) => {
    return (
        <Card className="info-table-card">
            <Card.Header>
                <h5>Daret Information</h5>
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
                            <td>Members #:</td>
                            <td>{maxMembers}</td>
                        </tr>


                        <tr>
                            <td>Contribution:</td>
                            <td>{contribution}</td>
                        </tr>

                        <tr>
                            <td>Members:</td>
                            <td>
                                <ul> {
                                    members.map((member, index) => (
                                        <li key={index}>
                                            {member}</li>
                                    ))
                                } </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Payout:</td>
                            <td>{
                                round ?. payout
                            }</td>
                        </tr>
                        <tr>
                            <td>Round Number:</td>
                            <td>{
                                round ?. roundNumber
                            }</td>
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export const DaretPage = () => {
    let {address} = useParams();
    let navigate = useNavigate();

    const web3 = new Web3(magic.rpcProvider);
    const [user, setUser] = useContext(UserContext);
    const [round, setRound] = useState(null);
    const [owner, setOwner] = useState(null);
    const [members, setMembers] = useState([]);
    const [contribution, setContribution] = useState(1);
    const [maxMembers, setMaxMembers] = useState(1);
    const [data, setData] = useState();
    const contract = useMemo(() => new web3.eth.Contract(DARET_CONTRACT_ABI, address, {from: user}), [web3.eth.Contract, address, user]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/daret/' + address);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProperties = async () => {
        try {
            const roundData = await contract.methods.rounds(1).call();
            setRound(roundData);
            setContribution(roundData.contribution);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchOwner = async () => {
        try {
            const contractOwner = await contract.methods.owner().call();
            setOwner(contractOwner);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchMembersList = async () => {
        try {
            const memberList = await contract.methods.getMembers().call();
            setMembers(memberList);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchNumberMembers = async () => {
        try {
            const memberCount = await contract.methods.maxMembers().call();
            setMaxMembers(memberCount);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchContribution = async () => {
        try {
            const contribution = await contract.methods.contribution().call();
            setContribution(contribution);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!user) 
            return;
        
        (async () => {
            try {
                console.log(address)
                await fetchProperties();
                await fetchOwner();
                await fetchMembersList();
                await fetchNumberMembers();
                await fetchData();
                await fetchContribution();
            } catch (error) {
                console.error(error);
            }
        })();
    }, [user]);

    const join = async () => {
        try {
            await contract.methods.joinRound().send({from: user, value: contribution}).on('receipt', function (receipt) { // receipt example
                console.log(receipt);
            })
            toast.success('Successfully joined the daret!', {
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

    const complete = async () => {
        try {
            await contract.methods.completeRound(user).send({from: user}).on('receipt', function (receipt) { // receipt example
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
                            {data && round && maxMembers && members && 
                            <DaretTable round={round}
                                maxMembers={maxMembers}
                                members={members}
                                contribution={contribution}
                                data={data}/>
                            } 
                            </div>
                            <div className="">
                                {
                                owner === user && (
                                    <Row>
                                        <button onClick={complete}>Complete Round</button>
                                    </Row>
                                )
                            }
                                <Row>
                                    <button onClick={join}>Contribute</button>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};
