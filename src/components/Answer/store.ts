export interface AnswerProps {
    author: string;
    question: QuestionProps;
}

export interface QuestionProps {
    id: number;
    title: string;
    created_time: number;
    updated_time: number;
    url: string;
}

export interface AuthorProps {
    id: string;
    name: string;
    description: string;
}