import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Answer from '@/components/Answer';

export interface RecommendProps {

}

const Recommend = (props:RecommendProps & RouteComponentProps) => {
    const answers = [
        {
            author: 'lyl',
            question: {

            }
        }
    ];
    return (
        <div>
            {/* <Answer author="lyl" question={}/> */}
        </div>
    );
}

export default Recommend;