import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CandidatesList extends Component {
    state = {
        candidates: []
    }

    async componentDidMount() {
        const candidates = await this.loadData();
        this.setState({
            candidates: candidates
        })
    }

    loadData = async () => {
        const url = 'http://localhost:3000/v1/all'
        const response = await fetch(url);
        const data = response.json();
        return data;
    }

    render() {
        const { candidates } = this.state;
        return (
            <div>
                <h1>Candidate List</h1>
                <ul>
                    {candidates.map((candidate, index) => 
                        <li key={`candidate${index}`}>
                            <Link to={`list/${candidate.id}`}>{candidate.username}</Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

export default CandidatesList;