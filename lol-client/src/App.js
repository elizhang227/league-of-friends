import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CandidatesList from './components/candidatesList';
import ApiList from './components/apiList';
import ChooseTier from './components/chooseTier';
import MatchList from './components/matchList';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path='/' exact component={CandidatesList} />
        <Route path='/tier' component={ChooseTier} />
        <Route path='/test/:rank?/:division?' component={ApiList} />
        <Route path='/matches/:ign?' component={MatchList} /> 
      </Router>
    </div>
  );
}

export default App;
