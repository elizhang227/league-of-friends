import React from 'react';
import styled from 'styled-components';

const StatsLi = styled.li`
    list-style-type: none;
`;

const StyledB = styled.b`
    color: c6443e
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column; 
`;

const StyledUl = styled.ul`
    margin-bottom: 5px;
    @media only screen and (max-width:556px) {
        display: none;
    }
`;

const BottomUl = styled.ul`
    @media only screen and (max-width:556px) {
    display: none;
    }
}   
`;

const StyledH3 = styled.h3`
    font-size: 15px;
    margin: 0 0 5px;
    visibility: hidden;
`;

const KdaRatio = props => {
    //console.log('props', props)
    return (props.kdaRatio !== undefined ? 
        <StyledDiv>
            <StyledUl>
                <StyledH3>A</StyledH3>
                {props.kdaRatio.participants.slice(0,5).map((kda, index) => 
                    <StatsLi key={`stats${index}`}>
                        <StyledB>{((kda.stats.kills + kda.stats.assists) / kda.stats.deaths).toFixed(2)}:1</StyledB> KDA
                    </StatsLi>)}
            </StyledUl>
            <BottomUl>
                <StyledH3>B</StyledH3>
                {props.kdaRatio.participants.slice(5,10).map((kda, index) => 
                    <StatsLi key={`stats${index}`}>
                        <StyledB>{((kda.stats.kills + kda.stats.assists) / kda.stats.deaths).toFixed(2)}:1</StyledB> KDA
                    </StatsLi>)}
            </BottomUl>
        </StyledDiv>
        : null);
}

export default KdaRatio;