import React from 'react';

// functional component (stateless)
const userInput = (props) => {
    const style = {
        backgroundColor: 'red',
        font: 'inherit',
        padding: '8px',
        border: '10px solid yellow',
        cursor: 'pointer',
        textAlign: 'center',
    }

    return (
        <div style={style}>
            <input type="text" onChange={props.changed} value={props.username}/>
        </div>
    );
}

export default userInput;