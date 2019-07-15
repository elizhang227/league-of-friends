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
        //console.log('this is params', this.props.match.params.rank)
        const rank = this.props.match.params.rank
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/${rank}/I?page=1&api_key=RGAPI-686d668b-4395-44dd-8248-b63265a75ae5`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data
    }

    render() {
        const { people } = this.state;
        return (
            <div>
                <h2>apiList</h2>
                <ul>
                    {people.map((person, index) => 
                        <li key={`person${index}`}>
                            <Link to={`post/${person.leagueId}`}>{person.summonerName}</Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default ApiList;