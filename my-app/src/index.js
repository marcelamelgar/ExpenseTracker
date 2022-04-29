import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Row, Col, Form, Table, Button, Container, ButtonToolbar } from 'react-bootstrap';

function TitleText(){
  return (
    <Container>
      <Row className="justify-content-md-center mt-3">
        <Col md="auto">
          <h1 className="display-3">Expense Tracker</h1>
        </Col>
      </Row>
      <Row className="justify-content-md-center mt-1">
        <Col md="auto">
          <h2 className="text-success">Add A New Item:</h2>
        </Col>
      </Row>
    </Container>
  );  
}


function Apps() {
  return (
    <Container>
      <TitleText />
      <ExpenseTracker />
    </Container>
  );
}

var element = TitleText();
ReactDOM.render(element, document.getElementById('root'));

ReactDOM.render(
  <Apps />,
  document.getElementById('root')
);

reportWebVitals();