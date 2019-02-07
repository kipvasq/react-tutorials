import React from 'react';
import './UserOutput.css'

// functional component (stateless)
const userInput = (props) => {
    return (
        <div className="UserOutput">
            <p>Username: {props.username} </p>
            <p>Paragraph 2</p>
        </div>
    );
}

export default userInput;