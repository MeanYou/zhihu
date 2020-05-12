import * as React from 'react';
import useInitialize from '@/hooks/useInitialize';
import { initialState, reducer, getCommentListById } from './store';
import useThunkReducer from '@/hooks/useThunkReducer';
import {CommentProps as CommonCommentProps} from '@/common/CommonInterface';

const { useMemo } = React;

export interface CommentProps {
    answerId: number;
}
const Comment = (props: CommentProps) => {
    const { answerId } = props;

    const [state, dispatch] = useThunkReducer(reducer, initialState);
    const { commentList } = state;
    const [featuredList, unfeaturedList] = useMemo(() => {
        const featured:CommonCommentProps[] = [];
        const unfeatured:CommonCommentProps[] = [];
        commentList.forEach(item => {
            item.featured ?
                featured.push(item) : unfeatured.push(item);
        });
        return [featured, unfeatured];
    }, [commentList]);
    useInitialize(() => {
        dispatch(getCommentListById(answerId, 0));
    });
    return (
        <div>
            {
                featuredList.length && <div>精选评论</div>
            }
            {featuredList.map(item => (
                <div key={item.id}>
                    <div>{item.author.member.name}:</div>
                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
            ))}
            {
                unfeaturedList.length && <div>评论</div>
            }
            {
                unfeaturedList.map(item => (
                    <div key={item.id}>
                        <div>{item.author.member.name}:</div>
                        <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                    </div>
                ))
            }
        </div>
    );
}

export default Comment;