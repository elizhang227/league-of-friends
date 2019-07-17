import React, { Component } from 'react';

class MatchList extends Component {
    state = {
        matches: [],
        userInfo: [],
        test: []
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

        for (let i=0; i < poo.length; i++) {
            //console.log(matches.matches[0].champion)
            const x = matches.matches;
            //console.log('x', x[i].champion)
            // if (parseInt(poo[i].key) === x[i].champion) {
            //     console.log('it works')
            // }
            if (x[i].champion === TypeError) {
                console.log(x)
            }

        }
        this.setState({
            userInfo: userInfo,
            test: championInfo.data,
            matches: matches.matches
        })
    }

    loadUserInfo = async () => {
        //console.log('this is props', this.props.match.params.ign)
        const ign = this.props.match.params.ign;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ign}?api_key=RGAPI-2d6c539c-756d-44e3-a755-0056a0635ba2`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
    }

    loadData = async (id) => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/${id}?queue=420&season=13&beginIndex=0&api_key=RGAPI-2d6c539c-756d-44e3-a755-0056a0635ba2`;
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
        const { matches, userInfo, test } = this.state
        // let poo = [];
        // for (let [key, value] of Object.entries(test)) {
        //     poo.push({name: `${key}`, key: `${value.key}`})
        // }

        //console.log('this is matches', matches[0])
        //console.log('poo', poo[0])

        return (
            <div>
                <h2>list of matches</h2>
                <ul>
                    {matches.map((match, index) => {
                        
                        // this.test(poo, matches)
                        return (
                        <li key={`match${index}`}>
                            <p>{test.id}</p>
                            <p>Champion: {match.champion}</p>
                            <p>TimeStamp: {match.timestamp}</p>
                            <p>Queue: {match.queue}</p>
                            <p>Role: {match.role}</p>
                            <p>Lane: {match.lane}</p>
                        </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default MatchList;