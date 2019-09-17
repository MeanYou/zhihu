import * as React from 'react';
import { Icon, Popover } from 'antd';
import { classNames, formatNumber } from '@/common/CommonUtil';
import './style.less';

export interface AnswerOperatorProps {
    id: number;
    fullContentVisible: boolean;
    shouldItemFix: boolean;
    voteupCount: number;
    commentCount: number;
    className?: string;
    style?: React.CSSProperties;
    onClickFoldUp: () => void;
}

const AnswerOperator = (props: AnswerOperatorProps) => {
    const { id, fullContentVisible, shouldItemFix, voteupCount, commentCount, className, style = {}, onClickFoldUp } = props;
    const classnames = classNames(className, shouldItemFix ? 'answer-operator answer-fixed' : 'answer-operator');
    return (
        <div className={classnames} style={style}>
            <span className="answer-operator__voteup"><Icon type="caret-up" />&nbsp;赞同&nbsp;{formatNumber(voteupCount)}</span>
            <span className="answer-operator__votedown"><Icon type="caret-down" /></span>
            <span><Icon type="message" theme="filled" />&nbsp;{commentCount}条评论</span>
            <span><Icon type="fire" theme="filled" />&nbsp;分享</span>
            <span><Icon type="star" theme="filled" />&nbsp;收藏</span>
            <span><Icon type="heart" theme="filled" />&nbsp;感谢</span>
            <Popover trigger="click" content={<MoreOperation />}>
                <Icon type="ellipsis" />
            </Popover>
            {
                fullContentVisible ?
                    <span
                        className="answer-operator__foldup"
                        onClick={onClickFoldUp}>
                        收起<Icon type="up" />
                    </span> : null
            }

        </div>
    );
};

const MoreOperation = () => {
    return (
        <div>
            <div>举报</div>
            <div>没有帮助</div>
        </div>
    );
}

export default AnswerOperator;