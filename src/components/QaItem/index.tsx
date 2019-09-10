import * as React from 'react';
import { AnswerProps } from '@/common/CommonInterface';
import AuthorBrief from './AuthorBrief';
import { Link } from 'react-router-dom';
import useThunkReducer from '@/hooks/useThunkReducer';
import { reducer, initialState, changeFullContentVisible } from './store';
import AnswerOperator from './AnswerOperator';
import './style.less';

const { useCallback } = React;

export interface QaItemProps extends AnswerProps {
    className?: string;
    style?: React.CSSProperties;
}

const QaItem = (props: QaItemProps) => {
    const { id, author, question, thumbnail, excerpt, content, voteup_count, comment_count } = props;

    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { authorVisible, fullContentVisible, toggleFullContentVisible, commentVisible,
        toggleCommentVisible, commentModalVisible } = store;

    const showFullContent = useCallback(() => {
        dispatch(changeFullContentVisible(true));
    }, [dispatch]);
    const handleClickFoldUp = useCallback(() => {
        dispatch(changeFullContentVisible(false));
    }, [dispatch]);

    return (
        <div className="qa">
            {
                authorVisible ?
                    <AuthorBrief {...author} /> : null
            }
            <div className="qa__question">
                <Link to={`/question/${question.id}/answer/${question.id}`}>{question.title}</Link>
            </div>
            <div className="qa__answer">
                {
                    fullContentVisible ?
                        (
                            <div className="qa__answer__content" dangerouslySetInnerHTML={{ __html: content }}></div>
                        ) :
                        (
                            <div onClick={showFullContent} className="qa__answer__excerpt">
                                <img src={thumbnail} alt="" />
                                <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                            </div>
                        )
                }
            </div>
            <AnswerOperator
                id={id}
                voteupCount={voteup_count}
                commentCount={comment_count}
                fullContentVisible={fullContentVisible}
                onClickFoldUp={handleClickFoldUp} />
        </div>
    );
}

export default QaItem;