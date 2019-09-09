import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QaItem from '@/components/QaItem';
import useInitialize from '@/hooks/useInitialize';
import xhr from '@/utils/xhr';

export interface RecommendProps {

}

const { useEffect } = React;

const Recommend = (props: RecommendProps & RouteComponentProps) => {
    useInitialize(async () => {
        const res = await xhr.get('/recommend?limit=10&offset=0');
        console.log(res);
    });
    useEffect(() => {

    }, []);
    return (
        <div>
            {/* <QaItem author="lyl" question={}/> */}
        </div>
    );
}

export default Recommend;