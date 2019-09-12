import * as React from 'react';
import { classNames } from '@/common/CommonUtil';
import { AuthorProps, AuthorDetailProps } from '@/common/CommonInterface';
import './style.less';
import { Popover, Spin, Button, Icon } from 'antd';
import xhr from '@/common/xhr';
import useInitialize from '@/hooks/useInitialize';

const { useState, useEffect, useLayoutEffect } = React;

export interface AuthorItemProps extends AuthorProps {
    className?: string;
    style?: React.CSSProperties;
};


const AuthorBrief = (props: AuthorItemProps) => {
    const { avatar_url, name, headline, url_token } = props;
    const className = classNames(props.className, 'author__brief');
    return (
        <div className={className} style={props.style || {}}>
            {
                props.url_token ?
                    <Popover content={<AuthorDetail urlToken={url_token} />}>
                        <img className="author__brief__avatar" src={avatar_url} alt="avatar" />
                    </Popover> :
                    <img className="author__brief__avatar" src={avatar_url} alt="avatar" />
            }
            <span className="author__brief__name">{name}</span>
            <span className="author__brief__headline">{headline}</span>
        </div>
    );
}

export interface DetailProps {
    urlToken: string;
}
const AuthorDetail = (props: DetailProps) => {
    const { urlToken } = props;
    const initialDetail: AuthorDetailProps | null = null;
    const [detail, setDetail] = useState<AuthorDetailProps | null>(initialDetail);

    useInitialize(() => {
        xhr.get<any, AuthorDetailProps>(`/user/${urlToken}`).then((res) => {
            setDetail(res);
        });
    });

    return (
        <div>
            {
                detail ?
                    <div className="author__detail">
                        <div>
                            <img className="author__detail__avatar" src={`${detail.avatar_url}`} />
                            <div className="author__detail__brief">
                                <div>{detail.name}</div>
                                <div>{detail.headline}</div>
                            </div>
                        </div>
                        <div className="author__detail__pieces">
                            <div className="author__detail__pieces__item">
                                <span>回答</span>
                                <span>{detail.answer_count}</span>
                            </div>
                            <div className="author__detail__pieces__item">
                                <span>文章</span>
                                <span>{detail.articles_count}</span>
                            </div>
                            <div className="author__detail__pieces__item">
                                <span>关注者</span>
                                <span>{detail.follower_count}</span>
                            </div>
                        </div>
                        <div className="author__detail__operation">
                            <a target="_blank" href={detail.url}>
                                <Button type="primary" size="large" style={{width: 150}}><Icon type="zhihu-circle" theme="filled" />看看TA</Button>
                            </a>
                            <a target="_blank" href={`${detail.url}/answers`}>
                                <Button size="large" style={{width: 150}}><Icon type="highlight" theme="filled" />看回答</Button>
                            </a>
                        </div>
                    </div> : <Spin />
            }
        </div>
    );
}

export default AuthorBrief;