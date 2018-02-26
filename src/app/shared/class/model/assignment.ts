export class Assignment {
    assignment_id: number;
    user_id: number;
    team: string;
    address: string;
    remark: string;
    date: string;
    date_extend: string;
    postcode: number;


    constructor();
    constructor(assignment_id: number, user_id: number, team: string, address: string, remark: string, date: string, date_extend: string, postcode: number)
    constructor(
        assignment_id?: number, user_id?: number, team?: string, address?: string, remark?: string, date?: string, date_extend?: string, postcode?: number){
        this.assignment_id = assignment_id;
        this.user_id = user_id;
        this.team = team;
        this.address = address;
        this.remark = remark;
        this.date = date;
        this.date_extend = date_extend;
        this.postcode = postcode;
    }
}