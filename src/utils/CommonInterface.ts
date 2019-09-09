export interface AnswerProps {
    author: AuthorProps;// 作者信息
    comment_count: number;// 评论数
    content: string;// 答案内容
    created_time: number;// 创建时间
    excerpt: string;// 答案概览
    id: number;// 答案ID
    is_labeled: boolean;// 是否包含标签
    question: QuestionProps;// 问题信息
    thumbnail: string;// 缩略图地址
    topic_thumbnails: Array<string>;// 话题缩略图地址
    type: 'answer';// 类型
    updated_time: number;// 更新时间
    url: string;// 问题地址
    voteup_count: number;// 点赞数
}

export interface AuthorProps {
    avatar_url: string;// 头像地址
    avatar_url_template: string;// 头像地址模板
    badge: string[];// 徽章
    edu_member_tag: { member_tag: string, type: 'default' };
    gender: 0 | 1;// 0女，1男
    headline: string;// 用户描述
    id: string;// 用户ID
    is_advertiser: boolean;// 是否为广告商
    is_org: boolean;// 是否是机构
    name: string;// 用户名
    type: 'people';// 用户类型
    url: string;// 用户地址
    url_token: string;// 用户地址token
    user_type: 'people';// 用户类型
}

export interface QuestionProps {
    created: number;// 创建时间
    id: number;// 问题ID
    isFollowing: false;// 是否关注该问题
    question_type: string;// 问题类型
    title: string;// 问题标题
    type: 'question';// 类型：问题
    url: string;// 问题地址
}

