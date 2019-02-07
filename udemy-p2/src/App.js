import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {
    state = {
        inputText: ""
    }

    inputTextHandler = (event) => {
        this.setState({
            inputText: event.target.value
        })
    }

    deleteCharHandler = (index) => {
        let currentString = this.state.inputText
        
        currentString = currentString.substr(0, index) + currentString.substr(index + 1);

        this.setState({
            inputText: currentString
        });
    }

    render() {
        let chars = null;
        chars = (
            <div>
                {this.state.inputText.split('').map((char, index) => {
                    return (
                        <CharComponent 
                            character={char}
                            key={index}
                            click={() => this.deleteCharHandler(index)}
                        />
                    )
                })}
            </div>
        )
    

        return (
        <div className="App">
            <input 
                onChange={this.inputTextHandler}
                value={this.state.inputText}
            />
            <p>{this.state.inputText}</p>
            <ValidationComponent textLength={this.state.inputText.length}/>
            {chars}
        </div>
        );
    }
}

export default App;
