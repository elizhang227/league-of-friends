import React from 'react';
import styled from 'styled-components';

const StyledH2 = styled.h2`
    margin-top: 0;
`;

const WinStatus = props => {
    return (props.winStatus !== undefined ?
        <StyledH2>
            {props.winStatus}
        </StyledH2>
        : null);
}

export default WinStatus;