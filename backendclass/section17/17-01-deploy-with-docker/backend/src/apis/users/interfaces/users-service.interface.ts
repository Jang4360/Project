export interface IUsersServiceCreate {
    email: string;
    password: string;
    name: string;
    age: number;
}

export interface IUsersServiceFiondOneByEmail {
    email: string;
}
