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

function ExpenseForm({type, name, transactionDate, amount, handleChange, handleSubmit}) {
  return (
          <Form>
            <Form.Group className="justify-content-md-center mt-2">
              <Col md="auto">
                <h4 className="text-body">Type:</h4>
              </Col>
              <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  value={type}
                  name="type"
                  onChange={handleChange}
                >
                  <option>Choose..</option>
                  <option>Cash</option>
                  <option>Debit Card</option>
                  <option>Credit Card</option>
                  <option>Check</option>
                </Form.Control>
              </Form.Group>
              <Col md="auto">
                <h4 className="text-body">Name:</h4>
              </Col>
              <Form.Group as={Col} controlId="whereSpent">
                <Form.Control
                  type="input"
                  value={name}
                  placeholder="Where was the expense made?"
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Group>
            <Form.Group>
              <Col md="auto">
                <h4 className="text-body">Date:</h4>
              </Col>
              <Form.Group as={Col}>
                <Form.Control
                  type="date"
                  value={transactionDate}
                  name="transactionDate"
                  onChange={handleChange}
                />
              </Form.Group>
              <Col md="auto">
                <h4 className="text-body">Amount:</h4>
              </Col>
              <Form.Group as={Col} controlId="amountSpent">
                <Form.Control
                  type="input"
                  value={amount}
                  name="amount"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form.Group>
            <Row className="justify-content-md-center mt-1">
              <Col md="auto">
                <ButtonToolbar>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleSubmit}
                  >
                    Add Expense
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Form>
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

function SearchBar({filterText, 
                   onFilterTextChange}){
  return (
    <form>
      <input type='text' 
              value={filterText} 
              placeholder='Search...'
              onChange={(e) => onFilterTextChange(e.target.value)}
              />
    </form>
  );
}

function ProductCategoryRow({ name }) {
  return (
    <tr>
      <th colspan="2">
        {name}
      </th>
    </tr>
  );
}

function ProductTable({ products, filterText}) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase())
        === -1) {
      return;
    }
    
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow category={product.category} key={product.category} />
      );
    }
    
    lastCategory = product.category;
  });

  return(
    <ExpensesTable />
    );
  }

  function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');
    return (
      <div>
        <SearchBar filterText={filterText}
                   onFilterTextChange={setFilterText}/>
        <ProductTable products={products} 
                    filterText={filterText}/>
      </div>
    );
  }

function Apps() {
  return (
    <Container>
      <TitleText />
      <ExpenseTracker />
      <SearchBar />
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