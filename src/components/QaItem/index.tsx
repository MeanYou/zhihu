import * as React from 'react';
import { AnswerProps } from '@/common/CommonInterface';
import AuthorBrief from './AuthorBrief';
import { Link } from 'react-router-dom';
import useThunkReducer from '@/hooks/useThunkReducer';
import { reducer, initialState, changeFullContentVisible, changeShouldItemFix, handleClickFoldUp as clickFoldUp } from './store';
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
    const { id, author, question, thumbnail, excerpt, content, voteup_count, comment_count,
        fixFlag, onFixFlagChange, className, style = {} } = props;
    const qaRef = useRef<HTMLDivElement>(null);

    const [store, dispatch] = useThunkReducer(reducer, initialState);
    const { authorVisible, fullContentVisible, shouldItemFix, itemEmphasis,
        commentVisible, toggleCommentVisible, commentModalVisible } = store;
    const classnames = classNames(className, `qa${itemEmphasis ? ' qa--emphasis' : ''}`);

    // 展开、收起的回调
    const showFullContent = useCallback(() => {
        dispatch(changeFullContentVisible(true));
        onFixFlagChange();
    }, [dispatch]);
    const handleClickFoldUp = useCallback(() => {
        // 收起时如果当前item不在视野内，scroll到当前item顶部
        if (qaRef.current) {
            const itemTopOffsetTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop;
            if (itemTopOffsetTop < window.pageYOffset) {
                window.scroll({ top: itemTopOffsetTop, behavior: 'auto' });// 设置为smooth可以滑动，但是内容过长时导致停留在底部并加载下一页
            }
        }

        // dispatch(changeFullContentVisible(false));
        // dispatch(changeShouldItemFix(false));
        dispatch(clickFoldUp());
        onFixFlagChange();

    }, [dispatch]);

    // 判断QaItem是否应该浮动
    const judgeShouldItemFix = () => {
        if (fullContentVisible && qaRef.current) {
            // 当前回答顶部距layout content的距离
            const itemTopOffsetTop = qaRef.current.offsetTop + (qaRef.current.offsetParent as HTMLDivElement).offsetTop;
            // 当前回答底部距layout content的距离
            const itemBottomOffsetTop = itemTopOffsetTop + qaRef.current.clientHeight;
            const windowBottomOffsetTop = window.pageYOffset + document.documentElement.clientHeight;
            // 窗口底部距离body顶部已滚动像素位于item的顶部+300和底部之间，则fix，否则fix的情况下修改为不fix
            if ((windowBottomOffsetTop > itemTopOffsetTop + 300) && (windowBottomOffsetTop < itemBottomOffsetTop)) {
                dispatch(changeShouldItemFix(true));
            } else {
                shouldItemFix && dispatch(changeShouldItemFix(false));
            }

            // 目前使用dangerouslySetInnerHTML展示回答的富文本，偷个懒暂时先用DOM执行懒加载

        }
    }
    // 获取QaItem滚动时防抖函数
    const [debouncedCallback] = useDebouncedCallback(judgeShouldItemFix, 100, { maxWait: 200 });
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
    // mount之后执行副作用，全文阅读展开后开启监听，折叠后关闭监听
    useEffect(() => {
        let io: IntersectionObserver | null = null;
        
        if (fullContentVisible) {
            io = new IntersectionObserver((entries) => {
                entries.forEach(item => {
                    console.log(item);
                    item.isIntersecting && 
                    ((item.target as HTMLImageElement).src = (item.target as HTMLImageElement).dataset.actualsrc as string);
                });
            }, {
                rootMargin: '100px 0px'
            });
            const imgs = document.querySelectorAll('.origin_image.zh-lightbox-thumb.lazy');
            imgs.forEach(item => {
                (io as IntersectionObserver).observe(item);
            });
            
        }
        return () => {
            if (io) {
                io.disconnect();
            }

        }
    }, [fullContentVisible]);

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