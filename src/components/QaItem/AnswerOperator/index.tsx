import * as React from 'react';
import { Icon, Popover } from 'antd';
import { classNames } from '@/common/CommonUtil';

export interface AnswerOperatorProps {
    id: number;
    fullContentVisible: boolean;
    voteupCount: number;
    commentCount: number;
    className?: string;
    style?: React.CSSProperties;
    onClickFoldUp: () => void;
}

const AnswerOperator = (props: AnswerOperatorProps) => {
    const { id, fullContentVisible, voteupCount, commentCount, className, style, onClickFoldUp } = props;
    const classnames = classNames(className, 'answer-operator');
    return (
        <div className={classnames} style={style}>
            <span><Icon type="caret-up" />赞同&nbsp;{voteupCount}</span>
            <span><Icon type="caret-down" /></span>
            <span><Icon type="message" theme="filled" />{commentCount}条评论</span>
            <span><Icon type="fire" theme="filled" />分享</span>
            <span><Icon type="star" theme="filled" />收藏</span>
            <span><Icon type="heart" theme="filled" />感谢</span>
            <Popover trigger="click" content={<MoreOperation />}>
                <span>···</span>
            </Popover>
            {
                fullContentVisible ?
                    <span onClick={onClickFoldUp}>收起<Icon type="up" /></span> : null
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