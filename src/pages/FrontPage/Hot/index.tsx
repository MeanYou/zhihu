import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import useThunkReducer from '@/hooks/useThunkReducer';
import { reducer, initialState } from './store';

export interface HotProps {

}

const Hot = (props:HotProps & RouteComponentProps) => {
    const [state, dispatch] = useThunkReducer(reducer, initialState);
    const { hotItems } = state;
    return (
        <div></div>
    );
}

export default Hot;