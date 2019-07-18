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
    margin-bottom: 30px;
    padding-bottom: 30px;
`;

const StyledUl = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0 10px;
`;

const StyledDiv = styled.div`
    display: flex;
`;

const StatsLi = styled.li`
    list-style-type: none;
`;

const WinStatus = props => {
    // console.log('props', props)
    console.log('hi', props.winStatus)
    return (props.winStatus !== undefined ?
        <h2>
            {props.winStatus}
        </h2>
        : null);
}

const GameInfo = props => {
    //console.log('ginfo props', props)
    return (props.gameInfo !== undefined ? 
        <ul>
            {props.gameInfo.participantIdentities.map((player, index) => 
                <StatsLi key={`player${index}`}>
                    <b>Player: </b>{player.player.summonerName}
                </StatsLi>)}
        </ul> 
        : null);
}

const KdaInfo = props => {
    //console.log('props', props)
    return (props.kdaInfo !== undefined ? 
        <ul>
            {props.kdaInfo.participants.map((kda, index) => 
                <StatsLi key={`stats${index}`}>
                    <b>kills: </b>{kda.stats.kills} <b>deaths: </b>{kda.stats.deaths} <b>assists: </b>{kda.stats.assists}
                </StatsLi>)}
        </ul> 
        : null);
}


class SoloMatchList extends Component {
    state = {
        matches: [],
        userInfo: [],
        gameInfo: [],
        result: []
    }

    async componentDidMount() {
        const championInfo = await this.loadChampionInfo();
        //console.log('champ info', championInfo.data)
        const data = championInfo.data;
        const userInfo = await this.loadUserInfo();
        const matches = await this.loadData(userInfo.accountId);
        const foo = await this.loadUserName(userInfo.accountId)
        console.log('foo', foo.name)
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
        console.log('matchdata', matchData)

        let status = [];
        for (let i=0; i < 10; i++) {
            //console.log('pler acc id', userInfo.accountId)
            // Looping through participantIdentities to find out what the pId is for the specific user
            for (let j=0; j < 10; j++) {
                if (matchData[i].participantIdentities[j].player.accountId === userInfo.accountId) {
                    //console.log('participant id', matchData[i].participantIdentities[j].participantId)
                    let pId = matchData[i].participantIdentities[j].participantId;
                    if (pId === matchData[i].participants[j].participantId) {
                        //console.log('team id', matchData[i].participants[j].teamId)
                        let teamId = matchData[i].participants[j].teamId;
                        // Looping through teams to find the result of the team the user was from
                        for (let k=0; k < 2; k++) {
                            if (teamId === matchData[i].teams[k].teamId) {
                                //console.log('win status', matchData[i].teams[k].win)
                                let result = matchData[i].teams[k].win;
                                status.push(result);
                            }
                        }
                    }
                    //participant.push(pId);
                }
            }
        }
        //console.log('s array', status)

        this.setState({
            userInfo: userInfo,
            matches: x,
            gameInfo: matchData,
            result: status
        })
    }

    loadUserName = async (accountId) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${accountId}?api_key=${apiKey}`
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
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
        const { matches, userInfo, gameInfo, result } = this.state
        console.log('gameInfo', gameInfo)
        //console.log('matches', matches)
        //console.log('userInfo', userInfo);
        console.log('result', result)
        return (
            <div>
                <StyledHeader>Match History</StyledHeader>
                <StyledUl>
                    {matches.map((match, index) => {
                        //console.log('index', gameInfo[index])
                        return (
                        <StyledLi key={`match${index}`}>
                            <WinStatus winStatus={result[index]} />
                            <p>Champion: {match.champion}</p>
                            <p>TimeStamp: {match.timestamp}</p>
                            <p>Queue: {match.queue}</p>
                            <p>Role: {match.role}</p>
                            <p>Lane: {match.lane}</p>
                            <StyledDiv>
                                <GameInfo gameInfo={gameInfo[index]} />
                                <KdaInfo kdaInfo={gameInfo[index]} />
                            </StyledDiv>
                        </StyledLi>
                        )
                    })}
                </StyledUl>
            </div>
        )
    }
}

export default SoloMatchList;