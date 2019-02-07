import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';
import './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [
            { id: '23333', name: 'Max', age: 28 },
            { id: '22232', name: 'Manu', age: 29 },
            { id: '11111', name: 'Stephanie', age: 26 },
        ],
        otherState: 'Some Other Values',
        showPersons: false,
    }

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice(); // deep copy!
        const persons = [...this.state.persons]; // spread operator
        persons.splice(personIndex, 1);
        this.setState({persons: persons});
    }

    nameChangedHandler = (event, id) => {
        // get person index with given id
        const personIndex = this.state.persons.findIndex(p => { return p.id === id });

        // get copy of person information, update name
        const person = { ...this.state.persons[personIndex] }
        person.name = event.target.value;

        // get copy of state's persons entry, update person at personIndex
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        // enforce state with copy of state's persons, i.e. persons
        this.setState({
            persons: persons
        })
    }

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    }

    render() {
        // inline style (hover is radium)
        const style = {
            backgroundColor: 'green',
            color: 'white',
            font: 'inherit',
            border: '1x solid blue',
            padding: '8px',
            cursor: 'pointer',
            ':hover': {
                backgroundColor: 'lightgreen',
                color: 'black'
            }
        };

        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index)  => {
                        return ( 
                            <Person
                                name={person.name}
                                age={person.age}
                                click={() => this.deletePersonHandler(index)}
                                key={index}
                                changed={(event) => this.nameChangedHandler(event, person.id)}
                            />
                        );
                    })}
                </div>
            );

            style.backgroundColor = 'red';
            style[':hover'] = {
                backgroundColor: 'salmon',
                color: 'black'
            };
        }

        const classes = [];
        if (this.state.persons.length <= 2){
            classes.push('red'); // classes = ['red']
        } 
        if (this.state.persons.length <= 1){
            classes.push('bold'); // classes = ['red', 'bold']
        }

        return (
            <StyleRoot>
            <div className="App">
                <h1>Hi, I am a React App</h1>
                <p className={classes.join(' ')}> This is really working!</p>
                <button 
                    style={style}
                    onClick={this.togglePersonHandler}>Toggle Persons</button>
                {persons}
            </div>
            </StyleRoot>
        );
    }
};

export default Radium(App); // higher order component for extra features!
