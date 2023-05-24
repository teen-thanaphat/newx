import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        const displayname = sessionStorage.getItem('displayname');
        return (
            <div>
                <label >{displayname}</label>
               <h1>Hello, {displayname}!</h1>;
                
            </div>
        )
    }
}

 