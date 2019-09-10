import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QaItem from '@/components/QaItem';
import useInitialize from '@/hooks/useInitialize';
import useThunkReducer from '@/hooks/useThunkReducer';
import { initialState, reducer, getRecommendQaList } from './store';
import { Spin } from 'antd';

export interface RecommendProps {

}

const { useEffect } = React;

const Recommend = (props: RecommendProps & RouteComponentProps) => {
    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { qaList } = store;
    console.log(qaList);

    //　初始化获取推荐问答列表
    useInitialize(async () => {
        dispatch(getRecommendQaList(0));
    });
    
    useEffect(() => {

    }, []);

    return (
        <div>
            {
                qaList.length ?
                qaList.map(item => (
                    <QaItem key={item.id} {...item} />
                )) : <Spin/>
            }
        </div>
    );
}

export default Recommend;