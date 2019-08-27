import * as React from 'react';

const { useRef } = React;
const useInitialize = (fun:() => void) => {
    const isInitRef = useRef(true);
    if (isInitRef.current) {
        fun();
        console.log('初始化');
        isInitRef.current = false;
    }
};

export default useInitialize;