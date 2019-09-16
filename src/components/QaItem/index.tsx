import * as React from 'react';
import { AnswerProps } from '@/common/CommonInterface';
import AuthorBrief from './AuthorBrief';
import { Link } from 'react-router-dom';
import useThunkReducer from '@/hooks/useThunkReducer';
import { reducer, initialState, changeFullContentVisible } from './store';
import AnswerOperator from './AnswerOperator';
import './style.less';
import { classNames } from '@/common/CommonUtil';

const { useCallback } = React;

export interface QaItemProps extends AnswerProps {
    className?: string;
    style?: React.CSSProperties;
}

const QaItem = (props: QaItemProps) => {
    const { id, author, question, thumbnail, excerpt, content, voteup_count, comment_count, className, style = {} } = props;
    const classnames = classNames(className, 'qa');

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
        <div className={classnames} style={style}>
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
                                {thumbnail && <img className="qa__answer__excerpt__img" src={thumbnail} alt="" />}
                                <div
                                    style={{ width: thumbnail ? 440 : '100%' }}
                                    className="qa__answer__excerpt__content"
                                    dangerouslySetInnerHTML={{
                                        __html: `${excerpt}<span style="color: #175199; cursor: pointer;">&nbsp;阅读全文∨</span>`
                                    }}></div>
                            </div>
                        )
                }
            </div>
            <AnswerOperator
                id={id}
                voteupCount={voteup_count}
                commentCount={comment_count}
                fullContentVisible={fullContentVisible}
                className="qa__operator"
                onClickFoldUp={handleClickFoldUp} />
        </div>
    );
}

export default QaItem;