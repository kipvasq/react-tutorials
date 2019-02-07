import React from 'react';
import './CharComponent.css';

const charComponent = (props) => {
    return (
        <div onClick={props.click} className="CharComponent">
            <p>{props.character}</p>
        </div>
    )
}

export default charComponent;