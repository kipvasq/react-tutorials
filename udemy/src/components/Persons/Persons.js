import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    // static getDerivedStateFromProps(props, state){
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     // PureComponent automatically handles this!!
    //     console.log('[Persons.js] shouldComponentUpdate');
    //     if(nextProps.props !== this.props.persons ||
    //        nextProps.changed !== this.props.changed || 
    //        nextProps.clicked !== this.props.clicked){
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[Persons.js] componentWillMount');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[Persons.js] componenetWillUnmount');
    }

    render() {
        console.log("[Persons.js] rendering...");
        return this.props.persons.map((person, index)  => {
            return ( 
                <Person
                    key={index}
                    name={person.name}
                    age={person.age}
                    click={() => this.props.clicked(index)}
                    changed={(event) => this.props.changed(event, person.id)}
                    isAuth={this.props.isAuthenticated}
                />  
            );
        });
    }
}

export default Persons;

