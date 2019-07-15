import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CandidatesList from './components/candidatesList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={CandidatesList} />
      </Router>
    </div>
  );
}

export default App;
