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


function ExpensesTable({expenses, handleDelete}) {
  return (
    <Table striped bordered hover variant="dark" className="mt-5">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Date</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={index}>
            <td>{expense.type}</td>
            <td>{expense.name}</td>
            <td>{expense.transactionDate}</td>
            <td>
              <span>$</span>
              {expense.amount}
            </td>
            <td>
              <ButtonToolbar>
                <Button
                  variant="outline-light"
                  onClick={e => handleDelete(index)}
                >
                  X
                </Button>
              </ButtonToolbar>
            </td>
          </tr>
          ))}

      </tbody>
    </Table>
  );
}

function ExpenseTracker() {
  const [state, setState] = React.useState({
      type: "",
      name: "",
      transactionDate: new Date(Date.UTC),
      amount: "",
      expenses: [],
    })

  let handleChange = (event) => {
    const { name, value } = event.target;
    setState({...state, [name]: value });
  };

  let  handleSubmit = () => {   
    if (state.type && state.name && state.transactionDate && state.amount) {
      const addRow = {
        type: state.type,
        name: state.name,
        transactionDate: state.transactionDate,
        amount: state.amount,
      };

      const expenses = [...state.expenses];
      expenses.push(addRow);
    
      setState({      
        type: "",
        name: "",
        transactionDate: "",
        amount: "", expenses: expenses});  
    }
  };

  let handleDelete = (index) => {
    const expenses = [...state.expenses];
    expenses.splice(index, 1);
    setState({...state, expenses: expenses });
  };

  return (
    <Container>
      <ExpenseForm
        type={state.type}
        name={state.name}
        transactionDate={state.transactionDate}
        amount={state.amount}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      
      <ExpensesTable
        expenses={state.expenses}
        handleDelete={handleDelete}
      />
    </Container>
  );
  
}

const { useState } = React


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