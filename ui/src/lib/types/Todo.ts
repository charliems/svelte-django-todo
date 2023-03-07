export interface Todo {
    id: number;
    title: string;
    description: string;
}

export interface TodoRequest {
    title: string;
    description: string;
}

export interface TodoRequestError {
    title?: string;
    description?: string;
    non_field_errors?: string[];
    detail?: string;
}