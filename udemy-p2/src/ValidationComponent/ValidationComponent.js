import React from 'react';

const validationComponent = (props) => {
    let textStatus = ""
    if(props.textLength < 5){
        textStatus = "Text too short...";
    } else {
        textStatus = "Text too long...";
    }


    return (
        <div>
            <p>Text Status: {textStatus} </p>
        </div>
    );
}

export default validationComponent;