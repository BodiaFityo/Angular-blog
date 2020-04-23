export interface User {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface FireBaseAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Post {
    title: string;
    author: string;
    data: Date;
    text: string;
    id?: number;
}

export interface FbCreatedResponse {
    name: string;
}
