import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useInitialize from '@/hooks/useInitialize';
import useThunkReducer from '@/hooks/useThunkReducer';
import usePage from '@/hooks/usePage';
import { initialState, reducer, getRecommendQaList } from './store';
import { Spin } from 'antd';
import QaList from '@/components/QaList/QaList';
import { useDebouncedCallback, useDebounce } from 'use-debounce';

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

    console.log(page.pageLoading)


    // mount之后执行副作用，滚动时触发防抖函数
    const [debouncedCallback] = useDebouncedCallback(() => {
        if(listRef.current) {
            const listBottomOffsetTop = listRef.current.offsetTop + listRef.current.offsetHeight;
            if((listBottomOffsetTop - window.pageYOffset - document.documentElement.clientHeight < 200) && !page.pageLoading) {
                console.log('我要加载');
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
        <div ref={listRef}>
            <QaList qaList={qaList} />
            {
                page.pageLoading ? <Spin /> : null
            }
        </div>
    );
}

export default Recommend;