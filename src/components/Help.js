import 'animate.css';
import {
  Col,
  Container, Row
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function Help() {
  const { t } = useTranslation();
  return (
    <div className="main--help">
      <section className="help" id="help">
        <Container>
          <Row>
            <Col>
              <h3>{t('Introduction')}</h3>
              <p>{t('intro-message')}</p>
            </Col>
          </Row>

          {/* Creating an Account */}
          <Row>
            <Col>
              <h3>{t('Creating an Account')}</h3>
              <ol>
                <li>{t('ca-msg1')}</li>
                {/* <img src={pic1} alt="pic1"/>
                                <img src={pic2} alt="pic2"/> */}
                <li>{t('ca-msg2')}</li>
                {/* <img src={pic3} alt="pic3" style={{'width':'25%', 'height':'20%'}}/>
                                <img src={pic4} alt="pic4" style={{'width':'30%', 'height':'20%'}}/> */}
                <li>
                  {t("Check if you have funds in your wallet. If you don't, visit the")}
                  <Link to="/faucet">{t('faucet')}</Link>
                  {t(' to get test ETH.')}
                </li>
              </ol>
            </Col>
          </Row>

          {/* Joining or Creating a Daret */}
          <Row>
            <Col>
              <h3>{t('Joining or Creating a Daret')}</h3>
              <ol>
                <li>{t('jd-msg1')}</li>
                <li>{t('jd-msg2')}</li>
              </ol>
            </Col>
          </Row>

          {/* Contributing to a Daret */}
          <Row>
            <Col>
              <h3>{t('Contributing to a Daret')}</h3>
              <ol>
                <li>{t('cd-msg1')}</li>
                <li>{t('cd-msg2')}</li>
              </ol>
            </Col>
          </Row>

          {/* Daret Rounds and Rewards */}
          <Row>
            <Col>
              <h3>{t('Daret Rounds and Rewards')}</h3>
              <ol>
                <li>{t('dr-msg1')}</li>
                <li>{t('dr-msg2')}</li>
              </ol>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
