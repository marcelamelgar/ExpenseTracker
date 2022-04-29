import * as React from 'react';
import {Container} from 'react-bootstrap';
import TitleText from "./Component/TitleText";
import ExpenseTracker from "./Component/ExpenseTracker";

function App() {
  return (
    <Container>
      <TitleText />
      <ExpenseTracker />
    </Container>
  );
}

export default App;
