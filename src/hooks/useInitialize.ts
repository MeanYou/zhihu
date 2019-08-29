import { useRef } from 'react';

const useInitialize = (fun:() => void) => {
    let isInitRef = useRef(true);
    if(isInitRef.current) {
        fun();
        console.log('initialize...');
        isInitRef.current = false;
    }
};

export default useInitialize;