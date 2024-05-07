import 'bootstrap/dist/css/bootstrap.min.css';

import {useEffect} from 'react';
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../store/reducer';
import {connect} from 'react-redux';

import {Navbar} from 'react-bootstrap';
import {Form, Button} from 'react-bootstrap';
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

function FlaskLogin() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const sessionId = useSelector((state: {sessionId: string}) => state.sessionId);
  const dispatch = useDispatch();
  useEffect(() => {
    if (sessionId !== '') {
      dispatch({type: 'UPDATE', payload: ''});
      const formData = new FormData();
      axios.post('/unauth', formData);
    }
  }, []);  
  const login = async () => {
    if (! userName) {
      setMessage('User Name is required.');
      return	
    }
    if (! password) {
      setMessage('Password is required.');
      return
    }  
    const formData = new FormData();
    formData.append('user_name', userName);
    formData.append('password', password);
    await axios.post('/auth', formData)
    .then (function(response) {
      if (response.data.status === 'action-ok') {
        dispatch({type: 'UPDATE', payload: 'in session'});
        navigate('/FlaskHome');
        return;
      }
      else {
        setMessage(response.data.message);
        return;
      }
    })
    .catch (function(error) {
      setMessage('Network trouble has occurred.');
      return
    });
  };
  return (
    <>
      <header>
        <Navbar expand="lg" className="fixed-top navbar navbar-expand-lg px-lg-3 navbar-dark bg-primary">
          <Navbar.Brand><b>lab-flask</b></Navbar.Brand>
        </Navbar>
      </header>
      <footer className="footer fixed-bottom mt-auto p-lg-2 navbar-dark bg-primary">
        <span style={styles.white}>Copyright &copy; Xxxx Co., Ltd.</span>
      </footer>
      <main style={styles.margin}>
        <h5>Login</h5>
        <Container fluid="true">
          <Row noGutters="true">
            <Col>{message}</Col>
          </Row>
          <Row noGutters="true">
            <Col xs={12} md={4}>
              <Form.Control type="text" value={userName} placeholder="User Name" onChange={(e) => setUserName(e.target.value)} />
            </Col>
          </Row>
          <Row noGutters="true">
            <Col xs={12} md={4}>
              <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Col>
          </Row>
          <Row noGutters="true">
            <Col md="auto">
              <Button variant="outline-success" onClick={login}>Login</Button>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FlaskLogin);
