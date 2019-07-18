import React from 'react';
import styled from 'styled-components';

const StatsLi = styled.li`
    list-style-type: none;
`;

const StyledSpan = styled.span`
    margin-left: 50px;
`;

const DeathB = styled.b`
    color: #c6443e;
`;

const OtherB = styled.b`
    color: #555e5e;
`;

const KdaB = styled.b`
    color: #353a3a;
`;

const KdaInfo = props => {
    //console.log('props', props)
    return (props.kdaInfo !== undefined ? 
        <ul>
            {props.kdaInfo.participants.map((kda, index) => 
                <StatsLi key={`stats${index}`}>
                    <OtherB>{kda.stats.kills}</OtherB> / <DeathB>{kda.stats.deaths}</DeathB> / <OtherB>{kda.stats.assists}</OtherB> <StyledSpan><KdaB>{((kda.stats.kills + kda.stats.assists) / kda.stats.deaths).toFixed(2)}:1</KdaB> KDA</StyledSpan>
                </StatsLi>)}
        </ul> 
        : null);
}

export default KdaInfo;