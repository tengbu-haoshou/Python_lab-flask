import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navigate} from "react-router-dom";

function FlaskTop() {
  return <Navigate replace to='/FlaskLogin'/>;
}

export default FlaskTop;
