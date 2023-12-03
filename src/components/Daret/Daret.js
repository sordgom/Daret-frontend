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
<<<<<<< Updated upstream
import {UserContext} from '../../lib/UserContext';
import {useTranslation} from 'react-i18next';
=======
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import projImg2 from '../../assets/img/faz.png';
import projImg1 from '../../assets/img/nodex.png';
import projImg5 from '../../assets/img/team6.png';
import projImg4 from '../../assets/img/team7.png';
import projImg3 from '../../assets/img/team9.png';
import useAuth from '../../hooks/useAuth';
import { DaretCard } from './DaretCard';
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
export const Daret = () => {
  const {t} = useTranslation();
=======
export function Daret() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/daret';
  const { auth } = useAuth();
>>>>>>> Stashed changes
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

<<<<<<< Updated upstream
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if(user){
            const response = await fetch(process.env.REACT_APP_SERVER_URL+`daret/user/${user}`);
            const data = await response.json();
            console.log(data)
            setData(data);
            setLoading(false);
        }
      }
      catch(err){ 
          console.log(err);
          setLoading(false);
      }
=======
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
>>>>>>> Stashed changes
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
