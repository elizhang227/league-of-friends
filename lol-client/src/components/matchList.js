import React, { Component } from 'react';

class MatchList extends Component {
    state = {
        matches: [],
        userInfo: [],
    }

    async componentDidMount() {
        const championInfo = await this.loadChampionInfo();
        console.log('champ info', championInfo.data)
        const data = championInfo.data;
        const userInfo = await this.loadUserInfo();
        const matches = await this.loadData(userInfo.accountId);

        let poo = [];
        for (let [key, value] of Object.entries(data)) {
            poo.push({name: `${key}`, key: `${value.key}`})
        }
        //console.log(poo)
        let x = await matches.matches;
        for (let i=0; i < poo.length; i++) {
            // const x = await matches.matches;
            //console.log('x', x[i])
            for (let j=0; j < 100; j++) {
                if (parseInt(poo[i].key) === x[j].champion) {
                    //console.log(poo[i].name)
                    x[j].champion = poo[i].name;
                    //console.log('new value,', x[j].champion)
                }
            }
        }

        this.setState({
            userInfo: userInfo,
            matches: x
        })
    }

    loadUserInfo = async () => {
        //console.log('this is props', this.props.match.params.ign)
        const apiKey = process.env.REACT_APP_API_KEY;
        const ign = this.props.match.params.ign;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ign}?api_key=${apiKey}`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
    }

    loadData = async (id) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?queue=420&season=13&beginIndex=0&api_key=${apiKey}`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
    }

    loadChampionInfo = async () => {
        const url = `http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json`;
        const response = await fetch(url);
        const data = response.json();
        return data;
    }
    
    render() {
        const { matches, userInfo } = this.state
        return (
            <div>
                <h2>list of matches</h2>
                <ul>
                    {matches.map((match, index) => 
                        <li key={`match${index}`}>
                            <p>Champion: {match.champion}</p>
                            <p>TimeStamp: {match.timestamp}</p>
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