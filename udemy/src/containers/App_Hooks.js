import React, { useState } from 'react'; // hooks are 'use-' functions, to avoid class based components
import './App.css';
import Person from '../components/Persons/Person/Person';

const app = props => {
    // state 1 to update persons
    const [personsState, setPersonsState] = useState({
        persons: [
            { name: 'Max', age: 28 },
            { name: 'Manu', age: 29 },
            { name: 'Stephanie', age: 26 },
        ],
        otherState: 'Some Other Values'
    });

    // secondary state to update other members of state
    const [otherState, setOtherState] = useState('Some Other String');

    console.log(personsState, otherState, setOtherState);

    const switchNameHandler = () => {
        setPersonsState({
            persons: [
                { name: 'Maximilian', age: 28 },
                { name: 'Manu', age: 29 },
                { name: 'Stephanie', age: 27 },
            ],
            otherState: personsState.otherState
        });
    }

    return (
        <div className="App">
            <h1>Hi, I am a React App</h1>
            <button onClick={switchNameHandler} >Switch Name</button>
            <Person name={personsState.persons[0].name} age={personsState.persons[0].age}/>
            <Person name={personsState.persons[1].name} age={personsState.persons[1].age}>My Hobbies: Racing</Person>
            <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
        </div>
    );
};

export default app;

