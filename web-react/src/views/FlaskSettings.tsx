import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect} from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../store/reducer';
import {connect} from 'react-redux';

import {Nav, Navbar} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';

import {useNavigate} from "react-router-dom";
import axios from 'axios';

var styles = {
  margin: {
    margin: "55pt 10pt 10pt 10pt",
  },
  white: {
    color: "white",
  }
};

function FlaskSettings() {
  const navigate = useNavigate();
  const r: {PRODUCT_NAME: string; PRODUCT_DESC: string}[] = [];
  const [data, setData] = useState(r);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  useEffect(() => {
    axios.get("/info?type=settings")
    .then (function(response) {
      if (response.data.status === 'action-ok') {
        setValid(true);
        setData(response.data.list);
      }
      else {
        setMessage(response.data.message);
      }
    })
    .catch (function() {
      setMessage('Network trouble has occurred.');
    }) 
  }, []);
  function gotoHome() {
    navigate('/FlaskHome');
    return;
  };
  function gotoSettings() {
    navigate('/FlaskSettings');
    return;
  };
  function logout() {
    dispatch({type: 'UPDATE', payload: ''});
    const formData = new FormData();
    axios.post('/unauth', formData);
    navigate('/FlaskLogin');
    return;
  };
  return (
    <>
      <header>
        <Navbar expand="lg" className="fixed-top navbar navbar-expand-lg px-lg-2 navbar-dark bg-primary">
          <Navbar.Brand><b>lab-flask</b></Navbar.Brand>
          <Navbar.Collapse />
          <Button variant="light" onClick={logout}>Logout</Button>
        </Navbar>
      </header>
      <footer className="footer fixed-bottom mt-auto p-lg-2 navbar-dark bg-primary">
        <span style={styles.white}>Copyright &copy; Xxxx Co., Ltd.</span>
      </footer>
      <main style={styles.margin}>
        <Container fluid="true">
          <Row noGutters="true">
            <Col>{message}</Col>
          </Row>
          <Row noGutters="true">
            <Col md="auto">
              <Nav variant="tabs" activeKey="FlaskSettings">
                <Nav.Item>
                  <Nav.Link eventKey="FlaskHome" onClick={gotoHome}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="FlaskSettings" onClick={gotoSettings}><h5>Settings</h5></Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          {valid &&
            <Row noGutters="true">
              <Col md="auto">
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th align="center">Product Name</th>
                      <th align="center">Product Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(row => (
                      <tr>
                        <td key={row.PRODUCT_NAME} align="left">{row.PRODUCT_NAME}</td>
                        <td key={row.PRODUCT_NAME} align="left">{row.PRODUCT_DESC}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          }
        </Container>
      </main>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FlaskSettings);
