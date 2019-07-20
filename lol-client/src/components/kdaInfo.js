import React from 'react';
import styled from 'styled-components';

const StatsLi = styled.li`
    list-style-type: none;
`;

const DeathB = styled.b`
    color: #c6443e;
`;

const OtherB = styled.b`
    color: #555e5e;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column; 
`;

const StyledUl = styled.ul`
    margin-bottom: 5px;
    @media only screen and (max-width:412px) {
        padding-left: 5px;
    }
`;

const BottomUl = styled.ul`
    @media only screen and (max-width:412px) {
        padding-left: 5px;
}
`;

const StyledH3 = styled.h3`
    font-size: 15px;
    margin: 0 0 5px;
    visibility: hidden;
`;

const KdaInfo = props => {
    return (props.kdaInfo !== undefined ? 
        <StyledDiv>
            <StyledUl>
                <StyledH3>A</StyledH3>
                {props.kdaInfo.participants.slice(0,5).map((kda, index) => 
                    <StatsLi key={`stats${index}`}>
                        <OtherB>{kda.stats.kills}</OtherB> / <DeathB>{kda.stats.deaths}</DeathB> / <OtherB>{kda.stats.assists}</OtherB>
                    </StatsLi>)}
            </StyledUl>
            <BottomUl>
                <StyledH3>B</StyledH3>
                {props.kdaInfo.participants.slice(5,10).map((kda, index) => 
                    <StatsLi key={`stats${index}`}>
                        <OtherB>{kda.stats.kills}</OtherB> / <DeathB>{kda.stats.deaths}</DeathB> / <OtherB>{kda.stats.assists}</OtherB>
                    </StatsLi>)}
            </BottomUl>
        </StyledDiv>
        : null);
}

export default KdaInfo;