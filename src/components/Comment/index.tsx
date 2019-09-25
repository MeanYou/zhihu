import * as React from 'react';
import useInitialize from '@/hooks/useInitialize';
import { initialState, reducer, getCommentListById } from './store';
import useThunkReducer from '@/hooks/useThunkReducer';

// const { useReducer } = React;

export interface CommentProps {
    answerId: number;
}
const Comment = (props: CommentProps) => {
    const { answerId } = props;

    const [state, dispatch] = useThunkReducer(reducer, initialState);
    const {commentList} = state;
    useInitialize(() => {
        dispatch(getCommentListById(answerId));
    });
    return (
        <div>
            {commentList[0]}
        </div>
    );
}

export default Comment;