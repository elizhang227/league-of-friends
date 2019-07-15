import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CandidatesList from './components/candidatesList';
import ApiList from './components/apiList';
import ChooseTier from './components/chooseTier';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={CandidatesList} />
        <Route path='/tier' component={ChooseTier} />
        <Route path='/test/:rank?' component={ApiList} />
      </Router>
    </div>
  );
}

export default App;
