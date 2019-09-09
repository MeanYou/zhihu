import * as React from 'react';
import { AnswerProps } from '@/utils/CommonInterface';

const QaItem = (props: AnswerProps) => {
    return (
        <div className="answer">
            <div className="answer__question">{props.question}</div>
        </div>
    );
}

export default QaItem;