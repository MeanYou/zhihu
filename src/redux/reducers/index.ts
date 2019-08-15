import { combineReducers } from 'redux';
import app from './app';
import { StateProps as AppStateProps } from './app';

export interface StoreProps {
    app: AppStateProps
}

export default combineReducers({app});