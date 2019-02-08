import React, { Component } from 'react';
import './App.css';
// import Person from '../components/Persons/Person/Person';
// import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';
import AuthContext from '../context/auth-context';

class App extends Component {
    constructor(props) {
        super(props);
        console.log("[App.js] constructor");
    }

    state = { // calls constructor() and super()
        persons: [
            { id: '23333', name: 'Max', age: 28 },
            { id: '22232', name: 'Manu', age: 29 },
            { id: '11111', name: 'Stephanie', age: 26 },
        ],
        otherState: 'Some Other Values',
        showPersons: false,
        showCockpit: true,
        changeCounter: 0,
        authenticated: false,
    }

    static getDerivedStateFromProps(props, state) {
        // used for sync state to props, no side effects
        console.log('[App.js] getDerivedStateFromProps', props, state);
        return state;
    }

    componentDidMount() {
        // cause side effects, do not update state
        console.log('[App.js] componentDidMount');
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('[App.js] shouldComponentUpdate');
        return true;
    }
    
    componentDidUpdate() {
        console.log('[App.js] componentDidUpdate');
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

        // enforce state with copy of state's persons, i.e. persons, dependent on old state
        this.setState((prevState, props) => { 
            return {
                persons: persons, 
                changeCounter: prevState.changeCounter + 1 
            };
        });
    }

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({ showPersons: !doesShow });
    }

    loginHandler = () => {
        this.setState({ authenticated: true });
    }

    render() {
        console.log("[App.js] render");

        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <Persons
                    persons={this.state.persons}
                    clicked={this.deletePersonHandler}
                    changed={this.nameChangedHandler}
                    isAuthenticated={this.state.authenticated}
                />
            );
        }

        return (
            <Aux classes="App">
                <button onClick={() => {this.setState({ showCockpit: false })}}>Remove Cockpit</button>
                <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
                    { this.state.showCockpit ? (
                    <Cockpit
                        title={this.props.appTitle}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonHandler}
                    />) : null }
                    {persons}
                </AuthContext.Provider>
            </Aux>
        );
    }
};

export default withClass(App, "App"); // radium = higher order component for extra features!
