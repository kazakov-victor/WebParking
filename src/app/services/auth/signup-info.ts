export class SignUpInfo {
    name: string;
    username: string;
    phone: string;
    role: string[];
    password: string;

    constructor(name: string, username: string, phone: string, password: string) {
        this.name = name;
        this.username = username;
        this.phone = phone;
        this.password = password;
        this.role = ['user'];
    }
}
