import * as React from 'react';

const { useRef } = React;

export interface PageProps {
    pageNum: number;
    pageSize: number;
    pageLoading: boolean;
}
const usePage = (pageNum = 0, pageSize = 10, pageLoading = false) => {
    const pageRef = useRef<PageProps>({pageNum, pageSize, pageLoading});
    return pageRef.current;
};

export default usePage;