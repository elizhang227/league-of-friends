import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        //console.log('hi there', this.props)
        const apiKey = process.env.REACT_APP_API_KEY;
        const rank = this.props.match.params.rank;
        const division = this.props.match.params.division;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
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
                <h2>List of {rank} {division} Players</h2>
                <ul>
                    {people.map((person, index) => 
                        <li key={`person${index}`}>
                            <Link to={`/matches/${person.summonerName}`}>{person.summonerName}</Link>
                            <p>Win Ratio: {(person.wins / (person.wins + person.losses) * 100).toFixed(2)}% {person.wins}W {person.losses}L</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default ApiList;