import React, { Component } from 'react';

import '../css/chooseTier.css';

class ChooseTier extends Component {
    state = {
        tier: '',
        division: ''
    }

    handleTierClick = async (e) => {
        let value = e.target.value;
        let rank = value.toUpperCase();
        this.setState({
            tier: rank
        })
    }

    handleDivisionClick = async (e) => {
        let division = e.target.value;
        this.setState({
            division: division
        })
    }

    render() {
        const { tier, division } = this.state
        return (
            <div>
                <h1>Search Desired Rank</h1>
                <form action={`/test/${tier}/${division}`}>
                    <div className='options'>
                        <select id='tier' onChange={(e) => this.handleTierClick(e)}>
                            <option label='Choose Tier' selected disabled='disabled'/>
                            <option label='Bronze' value='Bronze' />
                            <option label='Silver' value='Silver' />
                            <option label='Gold' value='Gold' />
                            <option label='Platinum' value='Platinum' />
                            <option label='Diamond' value='Diamond' />
                            <option label='Master' value='Master' />
                            <option label='Challenger' value='Challenger' />
                        </select>
                        <select id='division' onChange={(e) => this.handleDivisionClick(e)}>
                            <option label='Choose Div' selected disabled='disabled'/>
                            <option label='I' value='I' />
                            <option label='II' value='II' />
                            <option label='III' value='III' />
                            <option label='IV' value='IV' />
                        </select>
                    </div>
                    <div className='button'>
                        <button type='submit'>search</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ChooseTier;