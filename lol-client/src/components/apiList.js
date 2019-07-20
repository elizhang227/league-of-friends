import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import '../css/apiList.css';

const Wins = styled.b`
    color: green;
`;

const Losses = styled.b`
    color: red;
`;

class ApiList extends Component {
    state = {
        people: []
    }

    async componentDidMount() {
        const people = await this.loadData();
        this.setState({
            people: people
        })
    }

    loadData = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const rank = this.props.match.params.rank;
        const division = this.props.match.params.division;
        // cors anywhere proxy : https://cors-anywhere.herokuapp.com/
        const proxyurl = "http://localhost:3001/";
        const url = `https://na1.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/${rank}/${division}?page=1&api_key=${apiKey}`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
    }

    render() {
        const { people } = this.state;
        const rank = this.props.match.params.rank;
        const division = this.props.match.params.division;
        return (
            <div>
                <h2 className='api-h2'>{rank} {division} Players</h2>
                <ul>
                    {people.map((person, index) => 
                        <li key={`person${index}`} className='api-li'>
                            <Link to={`/matches/${person.summonerName}`}>{person.summonerName}</Link>
                            <p className='api-p'><b>Win Ratio: </b>{(person.wins / (person.wins + person.losses) * 100).toFixed(2)}% <Wins>{person.wins}W</Wins> <Losses>{person.losses}L</Losses></p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default ApiList;