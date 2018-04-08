export class ExhibitItem {
    exhibit_item_id: number;
    exhibit_id: number;
    code: string;
    type: string;
    s3_path: string;
    local_path: string;
    fileName: string;
    file: File;

    constructor(){}
}