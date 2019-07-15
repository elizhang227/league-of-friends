import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CandidatesList from './components/candidatesList';
import ApiList from './components/apiList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={CandidatesList} />
        <Route path='/test' component={ApiList} />
      </Router>
    </div>
  );
}

export default App;
