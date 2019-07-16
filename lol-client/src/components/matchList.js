import React, { Component } from 'react';

class MatchList extends Component {
    state = {
        matches: []
    }

    async componentDidMount() {
        const matches = await this.loadData();
        //console.log('matches', matches.matches)
        //nested object so need matches.matches
        this.setState({
            matches: matches.matches
        })
    }

    loadData = async () => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/wa_F6oFrqPMH0O9lO_k0_LxTp_EWitBq_arVeeeomNYJVQ?api_key=RGAPI-2d6c539c-756d-44e3-a755-0056a0635ba2`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        //console.log('data', data)
        return data;
    }
    
    render() {
        const { matches } = this.state
        return (
            <div>
                <h2>list of matches</h2>
                <ul>
                    {matches.map((match, index) => 
                        <li key={`match${index}`}>
                            <p>Champion: {match.champion}</p>
                            <p>Queue: {match.queue}</p>
                            <p>Role: {match.role}</p>
                            <p>Lane: {match.lane}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default MatchList;