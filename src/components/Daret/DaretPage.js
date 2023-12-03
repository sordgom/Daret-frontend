import 'animate.css';
import { useEffect, useState } from 'react';
import {
    Card,
    Container,
    Row,
    Table
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

function DaretTable({t, data}) {
    return (
        <Card className="info-table-card">
            <Card.Header>
                <h5>{
                    t('Daret Information')
                }</h5>
            </Card.Header>
            <Card.Body>
                <Table responsive="sm" bordered hover className="info-table">
                    <tbody>
                        <tr>
                            <th>{
                                t('Property')
                            }</th>
                            <th>{
                                t('Value')
                            }</th>
                        </tr>

                        <tr>
                            <td> {
                                t('Name')
                            }
                                :
                            </td>
                            <td> {
                                data ?. name
                            } </td>
                        </tr>

                        <tr>
                            <td> {
                                t('Description')
                            }
                                :
                            </td>
                            <td> {
                                data ?. description
                            } </td>
                        </tr>

                        <tr>
                            <td> {
                                t('Amount')
                            }
                                :
                            </td>
                            <td> {
                                data ?. amount
                            }
                                USD
                            </td>
                        </tr>

                        <tr>
                            <td> {
                                t('Period')
                            }
                                :
                            </td>
                            <td> {
                                data ?. period
                            }
                                days
                            </td>
                        </tr>

                        <tr>
                            <td> {
                                t('isPrivate')
                            }
                                :
                            </td>
                            <td> {
                                data ?. is_private ?. Bool ? 'Yes' : 'No'
                            } </td>
                        </tr>

                        <tr>
                            <td> {
                                t('Number of Members')
                            }
                                :
                            </td>
                            <td> {
                                data ?. max_members ?. Int32
                            } </td>
                        </tr>

                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export function DaretPage() {
    const {t} = useTranslation();
    const {id} = useParams();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ?. from ?. pathname || '/daret';
    const {auth} = useAuth();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        setLoading(true);
        try {
<<<<<<< Updated upstream
            const response = await fetch(process.env.REACT_APP_SERVER_URL+`daret/address/${address}`);
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
=======
            const response = await axios.get(`/darets/${id}`, {
                headers: {
                    Authorization: `Bearer ${
                        auth ?. accessToken
                    }`
                },
                withCredentials: true
            });
            setData(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
>>>>>>> Stashed changes
        }
    }

    const handleInvite = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `/darets/${id}/invite`,
          {
            invited_username: 'test',
          },
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
            withCredentials: true,
          },
        );
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    };

    const handleJoin = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `/darets/${id}/join`,
          {},
          {
            headers: {
              Authorization: `Bearer ${auth?.accessToken}`,
            },
            withCredentials: true,
          },
        );
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    };

    const handleContribution = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `/darets/${id}/contribute`,
          {},
          {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.accessToken}`,
            },
            withCredentials: true,
          },
        );
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    };

    const handleCollection = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `/darets/${id}/collect`,
          {},
          {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.accessToken}`,
            },
            withCredentials: true,
          },
        );
        navigate(from, { replace: true });
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="main--daret">
            <section className="daret" id="daret">
                <Container>
                    <Row>
                            <div className=""
                                style={
                                    {'marginTop': '60px'}
                            }>
<<<<<<< Updated upstream
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
                                            <Form.Label>{t("Enter Winner's Address")}</Form.Label>
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
=======
                                <DaretTable t={t}
                                    data={data}/>
                            </div>
                    </Row>
                    <Row>
                      <button type="submit" onClick={handleInvite}>
                        {t('Invite')}
                      </button>
                      <button type="submit" onClick={handleJoin}>
                        {t('Join')}
                      </button>
                      <button type="submit" onClick={handleContribution}>
                        {t('Contribute')}
                      </button>
                      <button type="submit" onClick={handleCollection}>
                        {t('Collect')}
                      </button>
>>>>>>> Stashed changes
                    </Row>
                </Container>
            </section>
        </div>
    );
}
