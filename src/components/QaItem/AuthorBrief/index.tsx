import * as React from 'react';
import { classNames } from '@/common/CommonUtil';
import { AuthorProps } from '@/common/CommonInterface';
import './style.less';
import { Popover } from 'antd';
import xhr from '@/common/xhr';

export interface AuthorItemProps extends AuthorProps {
    className?: string;
    style?: React.CSSProperties;
};
export interface AuthorDetailProps {
    urlToken: string;
}

const AuthorBrief = (props: AuthorItemProps) => {
    const { avatar_url, name, headline, url_token } = props;
    const className = classNames(props.className, 'author__brief');
    return (
        <div className={className} style={props.style || {}}>
            <Popover content={<AuthorDetail urlToken={url_token}/>}>
                <img className="author__brief__avatar" src={avatar_url} alt="avatar" />
            </Popover>
            <span className="author__brief__name">{name}</span>
            <span className="author__brief__headline">{headline}</span>
        </div>
    );
}

const AuthorDetail = (props: AuthorDetailProps) => {
    xhr.get(`/user/${props.urlToken}`).then((res) => {
        console.log(res);
    });
    
    return (
        <div>detail</div>
    );
}

export default AuthorBrief;