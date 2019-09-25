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

export interface QuestionProps {
    created: number;// 创建时间
    id: number;// 问题ID
    isFollowing: false;// 是否关注该问题
    question_type: string;// 问题类型
    title: string;// 问题标题
    type: 'question';// 类型：问题
    url: string;// 问题地址
}

export interface AuthorProps {
    avatar_url: string;// 头像地址
    avatar_url_template: string;// 头像地址模板
    badge: string[];// 徽章
    edu_member_tag?: { member_tag: string, type: 'default' };
    gender: 0 | 1;// 0女，1男
    headline: string;// 用户描述
    id: string;// 用户ID
    is_advertiser: boolean;// 是否为广告商
    is_org: boolean;// 是否是机构
    name: string;// 用户名
    type: 'people';// 用户类型
    url: string;// 用户地址
    url_token: string;// 用户查询token
    user_type: 'people';// 用户类型
}
export interface AuthorDetailProps {
    answer_count: number;// 回答数量
    articles_count: number;// 文章数量
    avatar_url: string;// 头像地址
    avatar_url_template: string;// 头像模板
    employments: any;// 职业信息
    follower_count: number;// 粉丝数量
    gender: 0|1;// 性别，0女1男
    headline: string;// 签名
    id: string;// 用户id
    is_advertiser: boolean;// 是否是广告商
    is_org: boolean;// 是否为机构
    name: string;// 用户名
    type: 'people';// 用户类型
    url: string;// 用户地址
    url_token: string;// 用户地址token
    use_default_avatar: boolean;// 是否使用默认头像
    user_type: 'people';// 用户类型
    vip_info: { is_vip: boolean; rename_days: number; }// 用户VIP信息
}

// 评论属性
export interface CommentProps {
    allow_delete: boolean;
    allow_like: boolean;
    allow_reply: boolean;
    allow_vote: boolean;
    author: {
        role: string;
        member: AuthorProps;
    };
    can_collapse: boolean;
    can_recommend: boolean;
    censor_status: number;
    child_comment_count: number;
    child_comments?: CommentProps[];
    collapsed: boolean;
    content: string;
    created_time: number;
    disliked: boolean;
    featured: boolean;
    id: number;
    is_author: number;
    is_delete: number;
    resource_type: 'answer';
    reviewing: boolean;
    type: 'comment';
    url: string;
    vote_count: number;
    voting: boolean;
}
