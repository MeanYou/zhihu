import * as React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { StoreProps } from '@/redux/reducers';
import { AnswerProps } from '@/common/CommonInterface';
import AuthorBrief from './AuthorBrief';
import { Link } from 'react-router-dom';
import useThunkReducer from '@/hooks/useThunkReducer';
import { reducer, initialState, changeFullContentVisible, changeShouldItemFix } from './store';
import AnswerOperator from './AnswerOperator';
import './style.less';
import { classNames } from '@/common/CommonUtil';

const { useCallback, useRef, useMemo, useEffect } = React;

export interface QaItemProps extends AnswerProps {
    className?: string;
    style?: React.CSSProperties;
}

// redux获取scrollTop
const selector = (state:StoreProps) => {
    return {
        scrollTop: state.app.scrollTop
    };
}

const QaItem = (props: QaItemProps) => {
    const { id, author, question, thumbnail, excerpt, content, voteup_count, comment_count, className, style = {} } = props;
    const classnames = classNames(className, 'qa');
    const qaRef = useRef<HTMLDivElement>(null);
    const { scrollTop } = useSelector(selector, shallowEqual);
    const globalDispatch = useDispatch();

    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { authorVisible, fullContentVisible, shouldItemFix, commentVisible,
        toggleCommentVisible, commentModalVisible } = store;

    const showFullContent = useCallback(() => {
        dispatch(changeFullContentVisible(true));
    }, [dispatch]);
    const handleClickFoldUp = useCallback(() => {
        dispatch(changeFullContentVisible(false));
        dispatch(changeShouldItemFix(false));
    }, [dispatch]);

    // 组件显示答案全部内容以及滚动的时候触发
    useEffect(() => {
        if(fullContentVisible) {
            if(qaRef.current) {
                console.log(qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop);
                console.log(qaRef.current.clientHeight);
                // 当前回答距main顶部的距离
                const itemTopOffsetTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop;
                // 当前回答距main底部的距离
                const itemBottomOffsetTop = itemTopOffsetTop + qaRef.current.clientHeight;
                // 当前scrollTop与视口高度之和位于当前回答的顶部和底部之间则fix
                if((scrollTop + document.documentElement.clientHeight > itemTopOffsetTop + 150) && (scrollTop + document.documentElement.clientHeight < itemBottomOffsetTop)) {
                    dispatch(changeShouldItemFix(true));
                } else {
                    dispatch(changeShouldItemFix(false));
                }
            }
        }
    }, [fullContentVisible, scrollTop]);

    // const shouldItemFix = useMemo(() => {
    //     let fixed = false;
    //     if(fullContentVisible) {
    //         if(qaRef.current) {
    //             console.log(qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop);
    //             console.log(qaRef.current.clientHeight);
    //             const itemBottomScrollTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop + qaRef.current.clientHeight;
    //             if(itemBottomScrollTop - scrollTop - document.documentElement.clientHeight > 0) {
    //                 fixed = true;
    //             }
    //         }
    //     }
    //     return fixed;
    // }, [fullContentVisible, scrollTop]);

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