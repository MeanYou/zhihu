/**
 * QaItem的容器
 * 自带一个state: fixFlag
 * 每次item点击了收起或者展开都会触发它的变化
 * 它的变化会在触发item执行useEffect
 * 然后会引起每个item重新计算自己是否fix
 */
import * as React from 'react';
import { AnswerProps } from '@/common/CommonInterface';
import QaItem from '../QaItem';

const { useState } = React;

export interface QaListProps {
    qaList: Array<AnswerProps>;
}
const QaList = (props: QaListProps) => {
    const { qaList } = props;
    const [fixFlag, setFixFlag] = useState(true);
    const handleSetFixFlag = () => {
        setFixFlag(!fixFlag);
    };
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