import 'animate.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="main--help">
      <section className="help" id="help">
        <Container>
          <h1>Unauthorized</h1>
          <br />
          <p>You do not have access to the requested page.</p>
          <div className="flexGrow">
            <button onClick={goBack}>Go Back</button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Unauthorized;
