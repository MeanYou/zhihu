import * as React from 'react';
import { AnswerProps } from '@/common/CommonInterface';
import AuthorBrief from './AuthorBrief';
import { Link } from 'react-router-dom';
import useThunkReducer from '@/hooks/useThunkReducer';
import { reducer, initialState, changeFullContentVisible, changeShouldItemFix } from './store';
import AnswerOperator from './AnswerOperator';
import './style.less';
import { classNames } from '@/common/CommonUtil';
import { useDebouncedCallback, useDebounce } from 'use-debounce';

const { useCallback, useRef, useMemo, useEffect } = React;

export interface QaItemProps extends AnswerProps {
    fixFlag: boolean;
    onFixFlagChange(): void;
    className?: string;
    style?: React.CSSProperties;
}

const QaItem = (props: QaItemProps) => {
    const { id, author, question, thumbnail, excerpt, content, voteup_count, comment_count, fixFlag, onFixFlagChange, className, style = {} } = props;
    const classnames = classNames(className, 'qa');
    const qaRef = useRef<HTMLDivElement>(null);

    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { authorVisible, fullContentVisible, shouldItemFix, commentVisible,
        toggleCommentVisible, commentModalVisible } = store;

    const showFullContent = useCallback(() => {
        dispatch(changeFullContentVisible(true));
        onFixFlagChange();
    }, [dispatch]);
    const handleClickFoldUp = useCallback(() => {
        dispatch(changeFullContentVisible(false));
        dispatch(changeShouldItemFix(false));
        onFixFlagChange();
    }, [dispatch]);

    // mount之后执行副作用，滚动时触发防抖函数
    const [debouncedCallback] = useDebouncedCallback(() => {
        if (fullContentVisible && qaRef.current) {
            // 当前回答顶部距layout content的距离
            const itemTopOffsetTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop;
            // 当前回答底部距layout content的距离
            const itemBottomOffsetTop = itemTopOffsetTop + qaRef.current.clientHeight;
        }
    }, 250, { maxWait: 250 });
    useEffect(() => {
        window.addEventListener('scroll', debouncedCallback);
        return () => {
            window.removeEventListener('scroll', debouncedCallback);
        }
    }, []);
    // 组件显示答案全部内容以及滚动的时候触发
    // useEffect(() => {
    //     if(fullContentVisible) {
    //         if(qaRef.current) {
    //             // 当前回答距main顶部的距离
    //             const itemTopOffsetTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop;
    //             // 当前回答距main底部的距离
    //             const itemBottomOffsetTop = itemTopOffsetTop + qaRef.current.clientHeight;
    //             // 当前scrollTop与视口高度之和位于当前回答的顶部和底部之间则fix
    //             if((scrollTop + document.documentElement.clientHeight > itemTopOffsetTop + 150) && (scrollTop + document.documentElement.clientHeight < itemBottomOffsetTop)) {
    //                 if(!shouldItemFix) {
    //                     dispatch(changeShouldItemFix(true));
    //                 }
    //             } else {
    //                 if(shouldItemFix) {
    //                     dispatch(changeShouldItemFix(false));
    //                 }

    //             }
    //         }
    //     }
    // }, [fullContentVisible, scrollTop, fixFlag]);

    return (
        <div className={classnames} style={style} ref={qaRef}>
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
                shouldItemFix={shouldItemFix}
                className="qa__operator"
                onClickFoldUp={handleClickFoldUp} />
        </div>
    );
}

export default QaItem;