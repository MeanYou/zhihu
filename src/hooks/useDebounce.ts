import * as React from 'react';
const { useCallback } = React;

const useDebounce = <T extends (...args: any[]) => any>(func: T, deps:any[], wait:number, immediate: boolean=false) => {
    let timeout:NodeJS.Timeout | null;
    return useCallback(function() {
        let args = arguments;
        const later = function() {
            timeout = null;
            !immediate && func(args);
        }
        let callNow = immediate && !timeout;
        timeout && clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        callNow && func(args);
    }, deps);
};
export default useDebounce;