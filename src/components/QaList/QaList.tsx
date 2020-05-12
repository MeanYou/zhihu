/**
 * QaItem的容器
 * 自带一个state: fixFlag
 * 每次item点击了收起或者展开都会触发它的变化
 * 它的变化会在触发item执行useEffect
 * 然后会引起每个item重新计算自己是否fix
 */
import * as React from 'react';
import { AnswerProps } from '@/common/CommonInterface';
import { initialState, reducer, changeFixFlag, changeCommentVisible } from './store';
import QaItem from '../QaItem';
import { Modal } from 'antd';
import useThunkReducer from '@/hooks/useThunkReducer';
import Comment from '../Comment';

const { useCallback } = React;

export interface QaListProps {
    qaList: Array<AnswerProps>;
}
const QaList = (props: QaListProps) => {
    const { qaList } = props;
    const [state, dispatch] = useThunkReducer(reducer, initialState);
    const { fixFlag, commentVisible } = state;
    // 展开折叠每个item时，使flag变成!flag，在QaItem中触发Effect重新计算是否fix
    const handleSetFixFlag = useCallback(() => {
        dispatch(changeFixFlag(!fixFlag));
    }, [dispatch]);

    return (
        <div>
            {
                qaList.map(item => (
                    <QaItem key={item.id} {...item} fixFlag={fixFlag} onFixFlagChange={handleSetFixFlag} />
                ))
            }
        </div>
    );
};

export default QaList;