import * as React from 'react';
import { RouteComponentProps } from  'react-router-dom';

const { useContext, createContext } = React;

export interface AppContextProps{
    theme: string;
    username: string;
}
const AppContext = createContext<AppContextProps>({
    theme: 'default',
    username: ''
});

const UseContext = (props:RouteComponentProps) => {
    const initialContext = {
        theme: 'default',
        username: ''
    };

    return (
        <AppContext.Provider value={initialContext}>
            <Father></Father>
        </AppContext.Provider>
        
    )
}

const Father = () => {
    return (
        <div>
            <div>Father</div>
            <Child></Child>
        </div>
    );
}

const Child = () => {
    const context = useContext(AppContext);
    return (
        <div>
            <div>Child</div>
            <div>{ context.theme }</div>
            <div>{ context.username }</div>
        </div>
        
    );
}

export default UseContext;