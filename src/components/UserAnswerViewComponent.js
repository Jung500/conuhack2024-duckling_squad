import React from 'react';

import '../styles/ViewComponent.css'

function UserAnswerViewComponent(props) {
    return (
        <div className='UserAnswerViewContainer'>
            <p>{props.answer}</p>
        </div>
    );
}

export default UserAnswerViewComponent;