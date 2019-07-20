import React from 'react';
import styled from 'styled-components';

const StatsLi = styled.li`
    list-style-type: none;
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column; 
`;

const StyledUl = styled.ul`
    margin-bottom: 5px;
    @media only screen and (max-width:412px) {
        padding-left: 10px;
    }
`;

const BottomUl = styled.ul`
    @media only screen and (max-width:412px) {
        padding-left: 10px;
    }
`;

const StyledH3 = styled.h3`
    font-size: 15px
    margin: 0 0 5px
`;

const NameInfo = props => {
    return (props.nameInfo !== undefined ? 
        <StyledDiv>
            <StyledUl>
                <StyledH3><u>Blue Team</u></StyledH3>
                {props.nameInfo.participantIdentities.slice(0,5).map((player, index) => 
                    <StatsLi key={`player${index}`}>
                        {player.player.summonerName}
                    </StatsLi>)}
            </StyledUl> 
            <BottomUl>
                <StyledH3><u>Red Team</u></StyledH3>
                {props.nameInfo.participantIdentities.slice(5,10).map((player, index) => 
                    <StatsLi key={`player${index}`}>
                        {player.player.summonerName}
                    </StatsLi>)}
            </BottomUl> 
        </StyledDiv>
        : null);
}

export default NameInfo;