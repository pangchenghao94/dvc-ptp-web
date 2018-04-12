import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { InD } from '../../shared/class/model/ind';
import { AuthService, GeneralService } from '../../shared';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { promise } from 'protractor';
 
@Component({
    selector: 'view-ind',
    templateUrl: './view-ind.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./view-ind.component.scss'],
    animations: [routerTransition()]
})
export class ViewINDComponent implements OnInit {
    ind: InD = new InD();
    sek8Data: any;
    sek5Data: any;
    exhibitData: any;
    floorPlanPath: any;
    premiseLocationPath: any;
    temp_exhibitItem_URI: any;
    modal: NgbModalRef;
    loading: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private auth: AuthService, private general: GeneralService, private modalService: NgbModal) {
        this.route.params.subscribe(params => {
            this.ind.ind_id = params['id'];
        });
        this.getInd(this.ind.ind_id);
    }

    ngOnInit() { }

    getInd(id) {
        this.loading = true;
        
        this.auth.postData(this.general.getAuthObject(), "api/ind/get/" + id).then((result) => {
            let responseData: any = result;

            if (responseData.status == "0") {
                alert(responseData.message);
            }

            else if (responseData.error) {
                console.log(responseData.error.text);
            }
            else if (responseData.status == "1") {
                let ind_data = responseData.ind;

                this.ind.assignment_id = ind_data.assignment_id;
                this.ind.p_cooperation = ind_data.p_cooperation;
                this.ind.p_close = ind_data.p_close;
                this.ind.p_empty = ind_data.p_empty;
                this.ind.p_shortAddr = ind_data.p_shortAddr;
                this.ind.po_name = ind_data.po_name;
                this.ind.po_id = ind_data.po_id;
                this.ind.no_familyMember = ind_data.no_familyMember;
                this.ind.no_fever = ind_data.no_fever;
                this.ind.no_out_breeding = ind_data.no_out_breeding;
                this.ind.no_in_breeding = ind_data.no_in_breeding;
                this.ind.container_type = ind_data.container_type;
                this.ind.no_pot_out_breeding = ind_data.no_pot_out_breeding;
                this.ind.no_pot_in_breeding = ind_data.no_pot_in_breeding;
                this.ind.act_abating = ind_data.act_abating;
                this.ind.act_destroy = ind_data.act_destroy;
                this.ind.act_education = ind_data.act_education;
                this.ind.act_pamphlet = ind_data.act_pamphlet;
                this.ind.coor_lat = ind_data.coor_lat;
                this.ind.coor_lng = ind_data.coor_lng;
                this.ind.created_by = ind_data.full_name;
                this.ind.issue_date = this.general.toDateDisplayFormat(ind_data.issue_date);

                if (responseData.exhibit.exhibit_id) {
                    this.exhibitData = {};
                    this.exhibitData.exhibit = responseData.exhibit;
                    this.exhibitData.exhibitItems = responseData.exhibitItems;
                }

                if (responseData.sek8) {
                    this.sek8Data = responseData.sek8;
                    this.sek8Data.checking_date = this.general.toDateDisplayFormat(this.sek8Data.checking_date);
                }

                if (responseData.sek5) {
                    let temp_dt = responseData.sek5.appointment_date;
                    let arr_dt = temp_dt.split(' ');
                
                    this.sek5Data = {
                    date : this.general.toDateDisplayFormat(arr_dt[0]),
                    time : arr_dt[1],
                    remark : responseData.sek5.remark
                    };
                }
            }
            this.loading = false;
        },
            (err) => {
                this.loading = false;
                alert("API error, please contact administrative person.");
                console.log("API error: " + JSON.stringify(err));
            });
    }

    editBtn(){
        let postData = {
            ind: this.ind,
            sek8Data: this.sek8Data,
            sek5Data: this.sek5Data,
            exhibitData: this.exhibitData,
            floorPlanPath: this.floorPlanPath,
            premiseLocationPath: this.premiseLocationPath
        };
        this.general.setTempData(postData);
        this.router.navigate(['/addEditIND', '2', this.ind.ind_id]);
    }

    deleteBtn() {

    }

    async openExhibitModal(content) {
        this.loading = true;
        let postData = this.general.getAuthObject();

        const promisesArray: any[] = [];    

        if(this.exhibitData.exhibit.floor_plan_URI == null || this.exhibitData.exhibit.premise_location_URI == null){   
            postData.data = {
                exhibit_id: this.exhibitData.exhibit.exhibit_id,
                premise_location_path: this.exhibitData.exhibit.premise_location_path,
                floor_plan_path: this.exhibitData.exhibit.floor_plan_path
            } 

            promisesArray.push(this.auth.postData(postData, "api/getDrawingsURL").then((result) => {
                let responseData: any = result;
    
                if (responseData.status == "0") {
                    alert(responseData.message);
                }
    
                else if (responseData.error) {
                    console.log(responseData.error.text);
                }
                else if (responseData.status == "1") {
                    this.exhibitData.exhibit.floor_plan_URI = responseData.floor_plan;
                    this.exhibitData.exhibit.premise_location_URI = responseData.premise_location;
                }
            },
            (err) => {
                alert("API error, please contact administrative person.");
                console.log("API error: " + JSON.stringify(err));
            }));
        }
    
        for(let i = 0; i < this.exhibitData.exhibitItems.length; i++){
            // await this.exhibitData.exhibitItems.forEach(async item => {
            let item = this.exhibitData.exhibitItems[i];

            if(item.fileName == null){
                postData.data = {
                    exhibit_id: this.exhibitData.exhibit.exhibit_id,
                    s3_path: item.s3_path
                }
                
                promisesArray.push(this.auth.postData(postData, "api/getExhibitItemURL").then((result) => {
                    let responseData: any = result;
        
                    if (responseData.status == "0") {
                        alert(responseData.message);
                    }
        
                    else if (responseData.error) {
                        console.log(responseData.error.text);
                    }
                    else if (responseData.status == "1") {
                        item.fileName = responseData.s3_path;
                        console.log(responseData);
                    }
                },
                (err) => {
                    alert("API error, please contact administrative person.");
                    console.log("API error: " + JSON.stringify(err));
                }));
            }
        }
        
        if (promisesArray.length != 0) {
            await Promise.all(promisesArray)
                .then((res) => {
                    this.loading = false;
                },
                (firstErr) => {
                    this.loading = false;
                    alert("API error, please contact administrative person.");
                    console.log("API error: " + JSON.stringify(firstErr));
                });
        }
        else {
            this.loading = false;
        }
        
        this.openModal(content, null);
    }

    openExhibitItemModal(content, path){
        this.temp_exhibitItem_URI = path;
        this.openModal(content, "lg");
        this.scrollFix();
    }

    openFPModal(content, size){
        this.openModal(content, size);
        this.scrollFix();
    }

    
    openPLModal(content, size){
        this.openModal(content, size);
        this.scrollFix();
    }

    openSek5Modal(content) {
        this.openModal(content, null);
    }

    openModal(content, size) {
        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false,
            size: size
        });
    }

    scrollFix(){
        this.modal.result.catch(() => {})
            .then(() => {
                if (document.querySelector('body > .modal')) {
                    document.body.classList.add('modal-open');
                }
            });
    }

    downloadDrawing(type) {
        window.location.href = type.src;
    }
}
