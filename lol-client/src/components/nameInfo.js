import React from 'react';
import styled from 'styled-components';

const StatsLi = styled.li`
    list-style-type: none;
`;

const NameInfo = props => {
    //console.log('ginfo props', props)
    return (props.nameInfo !== undefined ? 
        <ul>
            {props.nameInfo.participantIdentities.map((player, index) => 
                <StatsLi key={`player${index}`}>
                    <b>Player: </b>{player.player.summonerName}
                </StatsLi>)}
        </ul> 
        : null);
}

export default NameInfo;