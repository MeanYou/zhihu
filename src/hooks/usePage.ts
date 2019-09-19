import * as React from 'react';

const { useState } = React;

export interface PageProps {
    pageNum: number;
    pageSize: number;
    pageLoading: boolean;
}
const usePage = (pageNum = 0, pageSize = 10, pageLoading = true):[PageProps, ...((...args:any)=>any)[]] => {
    const [page, setPage] = useState<PageProps>({ pageNum, pageSize, pageLoading });
    const setPageNum = (pageNum: number) => {
        setPage({ ...page, pageNum });
    };
    const setPageSize = (pageSize: number) => {
        setPage({ ...page, pageSize });
    };
    const setPageLoading = (pageLoading: boolean) => {
        setPage({ ...page, pageLoading });
    };
    return [page, setPageNum, setPageSize, setPageLoading, setPage];
};

export default usePage;