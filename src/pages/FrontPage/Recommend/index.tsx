import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInitialize from '@/hooks/useInitialize';
import useThunkReducer from '@/hooks/useThunkReducer';
import usePage from '@/hooks/usePage';
import { initialState, reducer, getRecommendQaList } from './store';
import { Skeleton } from 'antd';
import QaList from '@/components/QaList/QaList';
import { useDebouncedCallback, useDebounce } from 'use-debounce';
import './style.less';

const { useEffect, useRef } = React;

export interface RecommendProps {

}
const Recommend = (props: RecommendProps & RouteComponentProps) => {
    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { qaList } = store;
    const listRef = useRef<HTMLDivElement>(null);

    //　初始化获取推荐问答列表
    const [page, setPageNum, setPageSize, setPageLoading, setPage] = usePage();
    useInitialize(() => {
        dispatch(getRecommendQaList(page.pageNum)).then(() => {
            console.log('finished')
            // setPageLoading(false);
            setPage({...page, pageNum: page.pageNum + 10,pageLoading: false});
        });
    });

    // mount之后执行副作用，滚动时触发防抖函数
    const [debouncedCallback] = useDebouncedCallback(() => {
        if(listRef.current) {
            const listBottomOffsetTop = listRef.current.offsetTop + listRef.current.offsetHeight;
            if((listBottomOffsetTop - window.pageYOffset - document.documentElement.clientHeight < 500) && !page.pageLoading) {
                setPageLoading(true);
                dispatch(getRecommendQaList(page.pageNum)).then(() => {
                    setPage({...page, pageNum: page.pageNum + 10,pageLoading: false});
                });
            }
        }
    }, 250, {maxWait: 250});
    useEffect(() => {
        window.addEventListener('scroll', debouncedCallback);
        return () => {
            window.removeEventListener('scroll', debouncedCallback);
        }
    }, []);

    return (
        <div ref={listRef} className="recommend">
            <QaList qaList={qaList} />
            {
                page.pageLoading ? 
                    <Skeleton
                        active avatar
                        paragraph={{ rows: 4 }}
                        className="recommend__skeleton"/> : null
            }
        </div>
    );
}

export default Recommend;