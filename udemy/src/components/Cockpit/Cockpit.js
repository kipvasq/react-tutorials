import React, { useEffect, useRef, useContext } from 'react';
import './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log("[Cockpit.js] useEffect");
        // http request...
        // const timer = setTimeout(() => {
        //     alert('Saved data to cloud!');
        // }, 1000);
        toggleBtnRef.current.click();
        return () => {
            // clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in useEffect')
        }
    }, []); // array is to execute useEffect code when specific variable changes
                         // empty array, only the first time on load

    useEffect(() => {
        console.log('[Cockpit.js] 2nd useEffect');
        return () => {
            console.log('[Cockpit.js] cleanup work in 2nd useEffect')
        }
    })

    const assignedClasses = [];
    let btnClass = '';

    if(props.showPersons){
        btnClass = 'Red';
    }

    if (props.personsLength <= 2){
        assignedClasses.push('red'); // assignedClasses = ['red']
    } 
    if (props.personsLength <= 1){
        assignedClasses.push('bold'); // assignedClasses = ['red', 'bold']
    }

    return (
        <div className="Cockpit">
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}> This is really working!</p>
            <button 
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button>
            <button onClick={authContext.login}>Log In</button>
        </div>
    );
}

export default React.memo(cockpit);