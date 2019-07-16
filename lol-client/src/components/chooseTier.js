import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class ChooseTier extends Component {
    state = {
        tier: '',
        division: ''
    }

    handleTierClick = async (e) => {
        console.log(e.target.value)
        let value = e.target.value;
        let rank = value.toUpperCase();
        this.setState({
            tier: rank
        })
    }

    handleDivisionClick = async (e) => {
        console.log(e.target.value)
        let division = e.target.value;
        this.setState({
            division: division
        })
    }

    render() {
        const { tier, division } = this.state
        return (
            <div>
                <h1>tier list</h1>
                <form action={`/test/${tier}/${division}`}>
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
                    {/* {(!!tier && !!division) ? <Redirect to={`/test/${tier}`} /> : ''} */}
                    <button type='submit'>search</button>
                </form>
            </div>
        )
    }
}

export default ChooseTier;