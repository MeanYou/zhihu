import * as React from 'react';
import {AnswerProps} from './store';

const Answer = (props:AnswerProps) => {
    return (
        <div className="answer">
            <div className="answer__question">{ props.question }</div>
        </div>
    );
}

export default Answer;