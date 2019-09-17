import * as React from 'react';

const { useRef } = React;

const usePage = () => {
    const pageRef = useRef(0);
    return pageRef.current;
};

export default usePage;