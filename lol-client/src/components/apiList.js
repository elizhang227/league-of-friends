import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ApiList extends Component {
    state = {
        people: []
    }

    async componentDidMount() {
        const people = await this.loadData();
        this.setState({
            people: people
        })
    }

    loadData = async () => {
        const url = 'https://na1.api.riotgames.com/lol/league/v4/entries/RANKED_SOLO_5x5/PLATINUM/I?page=1&api_key=RGAPI-686d668b-4395-44dd-8248-b63265a75ae5';
        const response = await fetch(url, {
            method: 'GET',
            // headers: {
            //     "Origin": "https://developer.riotgames.com",
            //     "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
            //     "X-Riot-Token": "RGAPI-686d668b-4395-44dd-8248-b63265a75ae5",
            //     "Accept-Language": "en-US,en;q=0.9",
            //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36"
            // }
            headers: {
                "X-App-Rate-Limit-Count": "1:1,1:120",
                "Content-Encoding": "gzip",
                "X-Method-Rate-Limit-Count": "1:2",
                "Vary": "Accept-Encoding",
                "X-App-Rate-Limit": "20:1,100:120",
                "X-Method-Rate-Limit": "10:2",
                "transfer-encoding": "chunked",
                "Connection": "keep-alive",
                "Cache-Control": "public, max-age=21600",
                "Date": "Mon, 15 Jul 2019  13:39:10 GMT",
                "X-Riot-Edge-Trace-Id": "87a89399-016a-4ce4-861d-2340a22eb2d4",
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "application/json"
            }
        });
        const data = response.json();
        return data
    }

    render() {
        return (
            <div>
                <h2>apiList</h2>
            </div>
        )
    }
}

export default ApiList;