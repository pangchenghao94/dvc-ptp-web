export class User {
    user_id: number;
    ic_no: string;
    username: string;
    password: string;
    state: boolean;
    full_name: string;
    phone_no: string;
    email: string;
    gender: number;
    usertype: number;

    constructor();
    constructor(user_id:number, username: string, state: boolean, password: string, full_name: string, phone_no: string, email: string, gender: number, usertype: number)
    constructor(
        user_id?: number,
        username?: string,
        state?: boolean,
        password?: string,        
        full_name?: string,
        phone_no?: string,
        email?: string,
        gender?: number,
        usertype?: number
    ){
        this.user_id = user_id;
        this.username = username;
        this.state = state;
        this.password = password;        
        this.full_name = full_name;
        this.phone_no = phone_no;
        this.email = email;
        this.gender = gender;
        this.usertype = usertype;
    }
}