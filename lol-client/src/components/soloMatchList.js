import React, { Component } from 'react';

import WinStatus from './winStatus';
import NameInfo from './nameInfo';
import KdaInfo from './kdaInfo';
import KdaRatio from './kdaRatio';

import '../css/soloMatchList.css';
import { StyledHeader, StyledLi, StyledUl, StyledDiv, StyledP, RankInfoP, TimeInfoP, StyledImg } from './styledComponents';

const mapInfo = require('../data').mapInfo;
const moment = require('moment');

class SoloMatchList extends Component {
    state = {
        matches: [],
        userInfo: [],
        gameInfo: [],
        result: []
    }

    async componentDidMount() {
        const championInfo = await this.loadChampionInfo();
        const data = championInfo.data;
        const userInfo = await this.loadUserInfo();
        const matches = await this.loadData(userInfo.accountId);

        let championArray = [];
        for (let [key, value] of Object.entries(data)) {
            championArray.push({name: `${key}`, key: `${value.key}`})
        }

        let x = await matches.matches;
        for (let i=0; i < championArray.length; i++) {
            for (let j=0; j < x.length; j++) {
                for (let k=0; k < 6; k++) {
                    // Reassigning actual names to champions rather than returning a number
                    if (parseInt(championArray[i].key) === x[j].champion) {
                        x[j].champion = championArray[i].name;
                    }
                    if (x[j].queue === mapInfo[k].queue) {
                        x[j].queue = mapInfo[k].type
                    }
                }
            }
        }

        let matchData = [];
        for (let i=0; i< 20; i++) {
            let matchInfo = await this.loadMatchInfo(x[i].gameId)
            matchData.push(matchInfo)
        }

        let status = [];
        for (let i=0; i < 20; i++) {
            // Looping through participantIdentities to find out what the pId is for the specific user
            for (let j=0; j < 10; j++) {
                if (matchData[i].participantIdentities[j].player.accountId === userInfo.accountId) {
                    let pId = matchData[i].participantIdentities[j].participantId;
                    if (pId === matchData[i].participants[j].participantId) {
                        let teamId = matchData[i].participants[j].teamId;
                        // Looping through teams to find the result of the team the user was from
                        for (let k=0; k < 2; k++) {
                            if (teamId === matchData[i].teams[k].teamId) {
                                let result = matchData[i].teams[k].win;
                                if (result === 'Win') {
                                    result = 'Victory'
                                } else if (result === 'Fail'){
                                    result = 'Defeat'
                                }
                                status.push(result);
                            }
                        }
                    }
                }
            }
        }

        this.setState({
            userInfo: userInfo,
            matches: x,
            gameInfo: matchData,
            result: status
        })
    }

    loadUserName = async (accountId) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const proxyurl = "http://localhost:3001/";
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${accountId}?api_key=${apiKey}`
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
    }

    loadUserInfo = async () => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const ign = this.props.match.params.ign;
        const proxyurl = "http://localhost:3001/";
        const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ign}?api_key=${apiKey}`;
        const response = await fetch(proxyurl + url);
        const data = response.json();
        return data;
    }

    loadData = async (id) => {
        const apiKey = process.env.REACT_APP_API_KEY;
        const proxyurl = "http://localhost:3001/";
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
        const proxyurl = "http://localhost:3001/";
        const url = `https://na1.api.riotgames.com/lol/match/v4/matches/${matchId}?api_key=${apiKey}`
        const response = await fetch (proxyurl + url);
        const data = response.json();
        return data;
    }
    
    render() {
        const { matches, userInfo, gameInfo, result } = this.state
        return (
            <div>
                {gameInfo.length === 0 ?
                    <div className="lds-hourglass"></div>
                    :
                    <>
                        <StyledHeader>{userInfo.name}'s Match History</StyledHeader>
                        <StyledUl>
                            {matches.map((match, index) => {
                                return (
                                <StyledLi key={`match${index}`} className={result[index]}>
                                    <div>
                                        <WinStatus winStatus={result[index]} />
                                        <StyledImg src={`https://opgg-static.akamaized.net/images/lol/champion/${match.champion}.png?image=w_100&v=1`} />
                                        <StyledP>{match.champion}</StyledP>
                                        <RankInfoP>{match.queue}</RankInfoP>
                                        <TimeInfoP>{moment(match.timestamp).fromNow()}</TimeInfoP>
                                    </div>
                                    <StyledDiv>
                                        <NameInfo nameInfo={gameInfo[index]} />
                                        <KdaInfo kdaInfo={gameInfo[index]} />
                                        <KdaRatio kdaRatio={gameInfo[index]} />
                                    </StyledDiv>
                                </StyledLi>
                                )
                            })}
                        </StyledUl>
                    </>
                }
            </div>
        )
    }
}

export default SoloMatchList;