import React, { Component } from 'react';
import { Table, Button, ButtonToolbar } from 'react-bootstrap';
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ExpenseForm extends Component {
  constructor() {
    super();
  }

  render() {
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
          {this.props.expenses.map((expense, index) => (
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
                    onClick={(e) => this.props.handleEdit(index)}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                  </Button>{' '}
                  |{' '}
                  <Button
                    variant="outline-light"
                    onClick={(e) => this.props.handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </ButtonToolbar>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default ExpenseForm;