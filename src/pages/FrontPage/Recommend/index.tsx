import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Answer from '@/components/Answer';
import useInitialize from '@/hooks/useInitialize';
import xhr from '@/utils/xhr';

export interface RecommendProps {

}

const { useEffect } = React;

const Recommend = (props: RecommendProps & RouteComponentProps) => {
    useInitialize(async () => {
        const res = await xhr.get('recommend?limit=10&offset=0');
        console.log(res);
    });
    useEffect(() => {

    }, []);
    return (
        <div>
            {/* <Answer author="lyl" question={}/> */}
        </div>
    );
}

export default Recommend;