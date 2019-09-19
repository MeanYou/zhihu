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

    // 判断QaItem是否应该浮动
    const judgeShouldItemFix = () => {
        if (fullContentVisible && qaRef.current) {
            // 当前回答顶部距layout content的距离
            const itemTopOffsetTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop;
            // 当前回答底部距layout content的距离
            const itemBottomOffsetTop = itemTopOffsetTop + qaRef.current.clientHeight;
            console.log(itemTopOffsetTop);
            console.log(itemBottomOffsetTop);
            const windowBottomOffsetTop = window.pageYOffset + document.documentElement.clientHeight;
            // 窗口底部距离body顶部已滚动像素位于item的顶部+300和底部之间，则fix，否则fix的情况下修改为不fix
            if ((windowBottomOffsetTop > itemTopOffsetTop + 300) && (windowBottomOffsetTop < itemBottomOffsetTop)) {
                dispatch(changeShouldItemFix(true));
            } else {
                shouldItemFix && dispatch(changeShouldItemFix(false));
            }
        }
    }
    // 获取QaItem滚动时防抖函数
    const [debouncedCallback] = useDebouncedCallback(judgeShouldItemFix, 250, { maxWait: 250 });
    // mount之后执行副作用，滚动时触发防抖函数
    useEffect(() => {
        window.addEventListener('scroll', debouncedCallback);
        return () => {
            window.removeEventListener('scroll', debouncedCallback);
        }
    }, []);
    // mount之后执行副作用，点击全文阅读或收起时触发防抖函数
    useEffect(() => {
        debouncedCallback();
    }, [fixFlag]);

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