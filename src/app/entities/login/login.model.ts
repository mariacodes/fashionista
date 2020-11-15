export interface ILogin {
    userName: string;
    password: string;
    userType: string;
}

export class Login implements ILogin {
    constructor(
        public userName: string,
        public password: string,
        public userType: string
    ) {
        this.userName = userName;
        this.password = password;
        this.userType = userType;
    }
}