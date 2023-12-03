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
                    </Row>
                </Container>
            </section>
        </div>
    );
}
