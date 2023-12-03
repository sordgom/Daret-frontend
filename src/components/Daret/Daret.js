import 'animate.css';
import { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Nav,
  Row,
  Tab,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import TrackVisibility from 'react-on-screen';
import { useLocation, useNavigate } from 'react-router-dom';
import projImg2 from '../../assets/img/faz.png';
import projImg1 from '../../assets/img/nodex.png';
import projImg5 from '../../assets/img/team6.png';
import projImg4 from '../../assets/img/team7.png';
import projImg3 from '../../assets/img/team9.png';
import useAuth from '../../hooks/useAuth';
import { DaretCard } from './DaretCard';

const team = [
  {
    title: 'NodeX',
    description: 'Founder',
    imgUrl: projImg1,

  },
  {
    title: 'FazNode',
    description: 'Core Team',
    imgUrl: projImg2,
  },
  {
    title: 'Travis',
    description: 'Core Team',
    imgUrl: projImg4,
  },
  {
    title: 'FazNode',
    description: 'Core Team',
    imgUrl: projImg3,
  }, {
    title: 'Travis',
    description: 'Core Team',
    imgUrl: projImg5,
  },
];

export function Daret() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/daret';
  const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await axios.get('/darets?page_id=1&page_size=10', {
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
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main--daret">
      <section className="daret" id="daret">
        <Container>
          <Row>
            <Col size={12}>
              {loading ? (
                <p>{t('Loading')}</p>
              ) : data.length === 0 ? (
                <p>{t('No Daret found')}.</p>
              ) : (
                <TrackVisibility>
                  {({ isVisible }) => (
                    <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>
                      <center>
                        <h2>Daret</h2>
                        <p>{t('Welcome to the Money Circle fair')}!</p>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                          <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab" />
                          <Tab.Content id="slideInUp" className={isVisible ? 'animate__animated animate__slideInUp' : ''}>
                            <Tab.Pane eventKey="first">
                              <Row>
                                {data.length > 0 ? (
                                  data.map((val, key) => (
                                    !val?.completed ? (
                                      <DaretCard
                                        key={key}
                                        {...val}
                                        imgUrl={team[key % 5].imgUrl}
                                      />
                                    ) : null
                                  ))
                                ) : null}
                              </Row>
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </center>
                    </div>
                  )}
                </TrackVisibility>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
