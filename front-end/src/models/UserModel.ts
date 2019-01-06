class UserModel {
    public id?: number;
    public username: string;
    public fullName: string;
    public password: string;
    public confirmPassword?: string;
    public exp?: number;
    public iat?: number;

    constructor(id: number | undefined, username: string, fullName: string, password: string, confirmPassword: string | undefined, exp: number | undefined, iat: number | undefined) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.exp = exp;
        this.iat = iat;
    }
}

export default UserModel