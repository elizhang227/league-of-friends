import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ChooseTier extends Component {
    state = {
        tier: ''
    }

    handleClick = async (e) => {
        let innerHTML = e.target.innerHTML;
        let rank = innerHTML.toUpperCase();
        this.setState({
            tier: rank
        })
    }

    render() {
        const { tier } = this.state
        return (
            <div>
                <h1>tier list</h1>
                <button onClick={(e) => this.handleClick(e)}>bronze</button>
                <button onClick={(e) => this.handleClick(e)}>silver</button>
                <button onClick={(e) => this.handleClick(e)}>gold</button>
                <button onClick={(e) => this.handleClick(e)}>platinum</button>
                <button onClick={(e) => this.handleClick(e)}>diamond</button>
                <button onClick={(e) => this.handleClick(e)}>master</button>
                <button onClick={(e) => this.handleClick(e)}>challenger</button>
                {(!!tier) ? <Redirect to={`/test/${tier}`} /> : ''}
            </div>
        )
    }
}

export default ChooseTier;