import React, { Component } from 'react';
import styled from 'styled-components';
const mapInfo = require('../data').mapInfo;

const StyledHeader = styled.h2`
    display: flex;
    justify-content: center;
`;

const StyledLi = styled.li`
    list-style-type: none;
    border-bottom: 3px solid red;
`;

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`;

const InnerLi = styled.li`
    list-style-type: none;
`;

const InnerUl = styled.ul`
    border-bottom: 3px solid red;
`;

const GameInfo = props => {
    console.log('props', props)
    return (props.gameInfo !== undefined ? 
        <ul>
            {props.gameInfo.participantIdentities.map((player, index) => 
                <li key={`player${index}`}>
                    {player.player.accountId}
                </li>)}
        </ul> 
                                        : null);
}

class SoloMatchList extends Component {
    state = {
        matches: [],
        userInfo: [],
        gameInfo: []
    }

    async componentDidMount() {
        const championInfo = await this.loadChampionInfo();
        //console.log('champ info', championInfo.data)
        const data = championInfo.data;
        const userInfo = await this.loadUserInfo();
        const matches = await this.loadData(userInfo.accountId);
        //console.log('matches', matches)
        //const matchInfo = await this.loadMatchInfo();

        let poo = [];
        for (let [key, value] of Object.entries(data)) {
            poo.push({name: `${key}`, key: `${value.key}`})
        }
        //console.log(poo)
        let x = await matches.matches;
        //console.log('length', x.length)
        for (let i=0; i < poo.length; i++) {
            //console.log('x', x)
            for (let j=0; j < x.length; j++) {
                for (let k=0; k < 6; k++) {
                    //console.log(j, x[j].gameId)
                    if (parseInt(poo[i].key) === x[j].champion) {
                        x[j].champion = poo[i].name;
                        //console.log('new value,', x[j].champion)
                    }
                    if (x[j].queue === mapInfo[k].queue) {
                        x[j].queue = mapInfo[k].type
                    }
                }
            }
        }

        let matchData = [];
        for (let i=0; i< 10; i++) {
            //console.log(i, x[i].gameId)
            let matchInfo = await this.loadMatchInfo(x[i].gameId)
            matchData.push(matchInfo)
        }
        //console.log('matchdata', matchData)

        this.setState({
            userInfo: userInfo,
            matches: x,
            gameInfo: matchData
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
        // only getting ranked solo entries
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

    loadMatchInfo = async (matchId) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`
        const response = await fetch (proxyurl + url);
        const data = response.json();
        return data;
    }
    
    render() {
        const { matches, userInfo, gameInfo } = this.state
        console.log('gameInfo', gameInfo)
        console.log('matches', matches)
        return (
            <div>
                <StyledHeader>Match History</StyledHeader>
                <StyledUl>
                    {matches.map((match, index) => {
                        console.log('index', gameInfo[index])
                        return <StyledLi key={`match${index}`}>
                            <p>Champion: {match.champion}</p>
                            <p>TimeStamp: {match.timestamp}</p>
                            <p>Queue: {match.queue}</p>
                            <p>Role: {match.role}</p>
                            <p>Lane: {match.lane}</p>
                            <GameInfo gameInfo={gameInfo[index]}/>
                        </StyledLi>
                    })}
                </StyledUl>

                {/* <StyledHeader>Game Info</StyledHeader>
                <StyledUl>
                    {gameInfo.map((stats, index) => 
                        <li key={`stats${index}`}>
                            <InnerUl>
                                {stats.participantIdentities.map((players, index) => 
                                <InnerLi key={`players${index}`}>
                                    <p>{players.player.accountId}</p>
                                </InnerLi>)}
                            </InnerUl>
                        </li>
                    )}
                </StyledUl> */}
            </div>
        )
    }
}

export default SoloMatchList;