const useInitialize = (fun:() => void) => {
    let isInit = true;
    if(isInit) {
        fun();
        console.log('initialize...');
        isInit = false;
    }
};

export default useInitialize;