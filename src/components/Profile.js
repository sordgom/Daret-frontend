import 'animate.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TrackVisibility from 'react-on-screen';
import axios from '../api/axios';
import projImg3 from '../assets/img/team9.png';
import useAuth from '../hooks/useAuth';

export function Profile() {
  const [balance, setBalance] = useState(0);
  const [walletInfo, setWalletInfo] = useState('-');
  const [user, setUser] = useState();
  const { t } = useTranslation();
  const from = location.state?.from?.pathname || '/profile';
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get('/accounts/balance', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            auth?.accessToken
          }`,
        },
        withCredentials: true,
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className={t('main--portfolio')}>
      <section className={t('portfolio')} id={t('portfolio')}>
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={t('')}>
                    <table className={t('table')}>
                      <thead>
                        <tr>
                          <th>{t('Attributes')}</th>
                          <th>{t('Values')}</th>
                        </tr>
                      </thead>
                    {!loading && (
                    <tbody>
                      <tr>
                        <td>{t('Balance')}</td>
                        <td>
                          {data}
                          {' '}
                          USD
                        </td>
                      </tr>
                    </tbody>
                    )}
                    </table>
                  </div>
                )} 
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? "" : ""} >
                    <img src={projImg3} alt="Header Img" />
                  </div>
                )}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
