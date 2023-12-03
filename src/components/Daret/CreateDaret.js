import 'animate.css';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import TrackVisibility from 'react-on-screen';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';

export function CreateDaret() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/daret';
  const { auth } = useAuth();

  const [name, setName] = useState('test');
  const [description, setDescription] = useState('test');
  const [amount, setAmount] = useState(100);
  const [period, setPeriod] = useState(1.5);
  const [isPrivate, setIsPrivate] = useState(false);
  const [members, setMembers] = useState(100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/darets',
        {
          name,
          description,
          amount,
          period,
          is_private: isPrivate,
          members: members,
        },
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
                      <Form className="login-form" onSubmit={handleSubmit}>
                        <h2>{t('Create Daret')}</h2>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Name')}</Form.Label>
                          <Form.Control
                            type="name"
                            id="name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the name of the Daret.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Description')}</Form.Label>
                          <Form.Control
                            type="description"
                            id="description"
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('Enter a description of the daret.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Amount')}</Form.Label>
                          <Form.Control
                            type="amount"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the contribution amount in USD.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Period')}</Form.Label>
                          <Form.Control
                            type="period"
                            id="period"
                            name="period"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('Please enter the number of members involved in the round.')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Label>{t('Number of members')}</Form.Label>
                          <Form.Control
                            type="members"
                            id="members"
                            name="members"
                            value={members}
                            onChange={(e) => setMembers(e.target.value)}
                          />
                          <Form.Text className="text-muted">
                            {t('How many times would you like the system to run?')}
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="form-group">
                          <Form.Check
                            type="checkbox"
                            label={t('Private Daret')}
                            checked={isPrivate}
                            onChange={(e) => setIsPrivate(e.target.checked)}
                          />
                        </Form.Group>

                        <button type="submit">
                          {t('Submit')}
                        </button>
                      </Form>

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
