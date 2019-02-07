import React, { Component } from 'react';
import './App.css';
import UserOutput from './UserOutput/UserOutput'
import UserInput from './UserInput/UserInput'

class App extends Component {
    state = {
        username: "Juan.Vasquez"
    }

    usernameChangedHandler = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    render() {
        return (
            <div>
                <UserInput 
                    username={this.state.username}
                    changed={this.usernameChangedHandler}/>
                <UserOutput username={this.state.username}/>
            </div>
        );
    }
}

export default App;
