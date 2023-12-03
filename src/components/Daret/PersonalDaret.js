import 'animate.css';
import { useEffect, useState } from 'react';
import {
  Col, Container, Nav, Row, Tab,
} from 'react-bootstrap';
import TrackVisibility from 'react-on-screen';
import Web3 from 'web3';
import projImg2 from '../../assets/img/faz.png';
import projImg1 from '../../assets/img/nodex.png';
import projImg5 from '../../assets/img/team6.png';
import projImg4 from '../../assets/img/team7.png';
import projImg3 from '../../assets/img/team9.png';
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

export function PersonalDaret() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const web3 = new Web3(magic.rpcProvider);

  useEffect(() => {
    async function fetchData() {
      if (user) {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}daret?userAddress=${user}`);
        const data = await response.json();
        const allDarets = data.data;
        setData(data.data);
        const involvedDarets = [];
        for (const daret of allDarets) {
          const contract = new web3.eth.Contract(DARET_CONTRACT_ABI, daret.address, { from: user });
          const membersList = await contract.methods.getMembers().call();
          if (!involvedDarets.includes(user) && membersList.includes(user)) {
            involvedDarets.push(daret);
          }
        }
        setData(involvedDarets);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="main--daret">
      <section className="daret" id="daret">
        <Container>
          <Row>
            <Col size={12}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div className={isVisible ? 'animate__animated animate__fadeIn' : ''}>

                    <center>
                      <h3>My Darets</h3>
                      <Tab.Container id="projects-tabs" defaultActiveKey="first">
                        <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab" />
                        <Tab.Content
                          id="slideInUp"
                          className={isVisible ? 'animate__animated animate__slideInUp' : ''}
                        >
                          <Tab.Pane eventKey="first">
                            <Row>
                              {

                                data.map((val, key) => (val?.creator === user ? (
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
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
