import 'animate.css';
import { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Nav,
  Row,
  Tab,
} from 'react-bootstrap';
import TrackVisibility from 'react-on-screen';
import projImg2 from '../../assets/img/faz.png';
import projImg1 from '../../assets/img/nodex.png';
import projImg5 from '../../assets/img/team6.png';
import projImg4 from '../../assets/img/team7.png';
import projImg3 from '../../assets/img/team9.png';
import { UserContext } from '../../lib/UserContext';
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
  },
  {
    title: 'Travis',
    description: 'Core Team',
    imgUrl: projImg5,
  },
];

export function CompletedDaret() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}daret`);
        const data = await response.json();
        setData(data.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div className="main--daret">
      <section className="daret" id="daret">
        <Container>
          <Row>
            <Col size={12}>
              {loading ? (
                <Col xs={12} className="text-center">
                  <p>Loading...</p>
                </Col>
              ) : (data.filter((val) => val.completed === true)).length === 0 ? (
                <Col xs={12} className="text-center">
                  <p>No Daret found</p>
                </Col>
              ) : (
                <TrackVisibility>
                  {({ isVisible }) => (
                    <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>

                      <center>
                        <h2>Daret</h2>
                        <p>Welcome to the Money Circle fair!</p>
                        <Tab.Container id="projects-tabs" defaultActiveKey="first">
                          <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab" />
                          <Tab.Content
                            id="slideInUp"
                            className={isVisible ? 'animate__animated animate__slideInUp' : ''}
                          >
                            <Tab.Pane eventKey="first">
                              <Row>
                                {

                                    data.map((val, key) => (val?.completed ? (
                                      <DaretCard
                                        key={key}
                                        {...val}
                                        imgUrl={team[key % 5].imgUrl}
                                      />
                                    ) : null))

                                }
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
