import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { StoreProps } from '@/redux/reducers';
import useInitialize from '@/hooks/useInitialize';
import useThunkReducer from '@/hooks/useThunkReducer';
import usePage from '@/hooks/usePage';
import { initialState, reducer, getRecommendQaList } from './store';
import { Spin } from 'antd';
import QaList from '@/components/QaList/QaList';

const { useEffect, useRef } = React;

const selector = (state: StoreProps) => {
    return {
        scrollTop: state.app.scrollTop
    };
};

export interface RecommendProps {

}
const Recommend = (props: RecommendProps & RouteComponentProps) => {
    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { qaList } = store;

    const { scrollTop } = useSelector(selector, shallowEqual);
    const listRef = useRef<HTMLDivElement>(null);

    //　初始化获取推荐问答列表
    let page = usePage();
    useInitialize(async () => {
        dispatch(getRecommendQaList(page.pageNum)).then(() => {
            page.pageLoading = false;
            page.pageNum += 10;
        });
    });

    // 滚动时执行
    useEffect(() => {
        if (listRef.current) {
            const topOffsetTop = listRef.current.offsetHeight + (listRef.current.offsetParent as HTMLDivElement).offsetHeight;
            const bottomOffsetTop = topOffsetTop + listRef.current.clientHeight;
            if(page.pageLoading) return;// 加载数据时不执行
            if (bottomOffsetTop - 100 < scrollTop + document.documentElement.clientHeight) {
                page.pageLoading = true;
                dispatch(getRecommendQaList(page.pageNum)).then(() => {
                    page.pageLoading = false;
                    page.pageNum += 10;
                });
            }
        }
    }, [scrollTop]);

    return (
        <div ref={listRef}>
            {
                qaList.length ? <QaList qaList={qaList} /> : <Spin />
            }
        </div>
    );
}

export default Recommend;