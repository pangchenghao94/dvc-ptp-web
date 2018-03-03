export class AssignmentAdmin {
    assignment_id: number;
    user_id: number;

    constructor();
    constructor(assignment_id: number, user_id: number)
    constructor(assignment_id?: number, user_id?: number){
        this.assignment_id = assignment_id;
        this.user_id = user_id;
    }
}