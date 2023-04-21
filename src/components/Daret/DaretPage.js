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
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';

const DaretTable = ({
    t,
    round,
    maxMembers,
    members,
    contribution,
    data,
    payout
}) => {
    return (
        <Card className="info-table-card">
            <Card.Header>
                <h5>{t('Daret Information')}</h5>
            </Card.Header>
            <Card.Body>
                <Table responsive="sm" bordered hover className="info-table">
                    <tbody>
                        <tr>
                            <th>{t('Property')}</th>
                            <th>{t('Value')}</th>
                        </tr>

                        <tr>
                            <td>{t('Title')}:</td>
                            <td>{
                                data[0] ?. title
                            }</td>
                        </tr>

                        <tr>
                            <td>{t('Description')}:</td>
                            <td>{
                                data[0] ?. description
                            }</td>
                        </tr>

                        <tr>
                            <td>{t('Members #')}:</td>
                            <td>{maxMembers}</td>
                        </tr>


                        <tr>
                            <td>{t('Contribution')}:</td>
                            <td>{contribution}
                                USD</td>
                        </tr>

                        <tr>
                            <td>{t('Members')}:</td>
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
                            <td>{t('Payout')}:</td>
                            <td>{payout}
                                USD</td>
                        </tr>
                        <tr>
                            <td>{t('Round Number')}:</td>
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
    const { t } = useTranslation();
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
    const [state, setState] = useState(0);
    const [payout, setPayout] = useState(0);
    const [addressInput, setAddressInput] = useState('');
    const [usdContribution, setUsdContribution] = useState(0);
    const [currentRound, setCurrentRound] = useState(0);
    const contract = useMemo(() => new web3.eth.Contract(DARET_CONTRACT_ABI, address, {from: user}), [web3.eth.Contract, address, user]);

    const fetchData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL+'daret/' + address);
            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProperties = async () => {
        try {
            const currentRound = await contract.methods.currentRound().call();
            setCurrentRound(currentRound)
            const roundData = await contract.methods.rounds(currentRound).call();
            setRound(roundData);
            let pay = await weiToUsd(roundData.payout);
            setPayout(pay)
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
            let cont = await weiToUsd(contribution);

            setContribution(contribution);
            setUsdContribution(cont)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchState = async () => {
        try {
            const state = await contract.methods.state().call();
            setState(state);
            console.log(state)
            if (state === '3') {
                await putData(process.env.REACT_APP_SERVER_URL+"daret/" + address, {completed: 1});
            }
        } catch (error) {
            console.error(error);
        }
    };

    async function hasAddressWonPreviousRounds(address) {
        try {
            for (let i = 1; i < currentRound; i++) {
                const roundWinner = await contract.methods.getRoundWinner(i).call();
                if (roundWinner.toLowerCase() === address.toLowerCase()) {
                    console.log(true)
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Error checking if address has won previous rounds:', error);
            return false;
        }
    }

    async function putData(url = '', data = {}) { // Default options are marked with *
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }

    useEffect(() => {
        if (!user) 
            return;
        
        (async () => {
            try {
                await fetchProperties();
                await fetchOwner();
                await fetchMembersList();
                await fetchNumberMembers();
                await fetchData();
                await fetchContribution();
                await fetchState();
            } catch (error) {
                console.error(error);
            }
        })();
    }, [user]);

    const join = async () => {
        try {
            const response = await contract.methods.joinRound().send({from: user, value: contribution});

            if (response.error && response.error.reason) {
                throw response.error;
            }

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
        } catch (error) {
            toast.error(error ?. reason || 'An error occurred while joining the daret.', {
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
            if (state !== '2') {
                toast.error("Invalid state.", {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                return;
            }
            let winnerCheck = await hasAddressWonPreviousRounds(addressInput);

            if (winnerCheck) {
                toast.error("This address already won a round.", {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                return;
            }
            if (!members.includes(addressInput)) {
                toast.error("Winner is not a member of the current round.", {
                    position: "top-center",
                    autoClose: 8000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                return;
            }

            await contract.methods.completeRound(addressInput).send({from: user}).on('receipt', function (receipt) { // receipt example
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

    async function weiToUsd(weiAmount) {
        try { // Fetch the Ether (ETH) to USD exchange rate
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            const ethToUsdRate = data.ethereum.usd;

            // Convert Wei to Ether
            const etherAmount = Web3.utils.fromWei(weiAmount, 'ether');

            // Calculate the USD equivalent of the Wei amount
            const usdAmount = parseFloat(etherAmount) * ethToUsdRate;
            return usdAmount.toFixed(2);
        } catch (error) {
            console.error('Error fetching ETH to USD rate:', error);
            return null;
        }
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
                                data && round && maxMembers && members && <DaretTable round={round}
                                    t={t}    
                                    maxMembers={maxMembers}
                                    members={members}
                                    contribution={usdContribution}
                                    data={data}
                                    payout={payout}/>
                            } </div>
                            <Row> {
                                owner === user && (
                                    <Col>

                                        <button style={
                                                {'width': '60%'}
                                            }
                                            onClick={complete}>{t("Complete Round")}</button>
                                        <Form.Group>
                                            <Form.Label>{t("Enter Address")}</Form.Label>
                                            <Form.Control type="text" placeholder="Enter address"
                                                value={addressInput}
                                                onChange={
                                                    (e) => setAddressInput(e.target.value)
                                                }/>
                                        </Form.Group>
                                    </Col>
                                )
                            }
                                <Col>
                                    <button style={
                                            {'width': '60%'}
                                        }
                                        onClick={join}>{t("Contribute")}</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};
