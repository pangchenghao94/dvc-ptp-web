import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, GeneralService } from '../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { InD } from '../../shared/class/model/ind';
import { NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ExhibitItem } from '../../shared/class/model/exhibit_item';

@Component({
    selector: 'addEdit-ind',
    templateUrl: './addEdit-ind.component.html',
    styleUrls: ['./addEdit-ind.component.scss'],
    animations: [routerTransition()]            
})
export class AddEditINDComponent implements OnInit {
    mode: any;
    indForm: FormGroup;
    poDetailsForm: FormGroup;
    exhibitForm: FormGroup;
    ind: any;
    sek8Data: any;
    sek5Data: any;
    exhibitData: any;
    floorPlanPath: any;
    premiseLocationPath: any;
    modal: any;
    loading: boolean = false;
    temp_exhibitItem_URI: any;
    allowedExt = '(.png|.jpe?g)';

    constructor(private fb: FormBuilder, private auth: AuthService, private general: GeneralService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {

        this.route.params.subscribe(params => {
            this.mode = params['action'];
            if(params['action'] == "2"){
                this.ind = new InD();
                this.ind.ind_id = params['id'];
            }
        });
        
        if(this.general.getTempData() != null){
            let temp_data: any = this.general.getTempData();
            this.ind = temp_data.ind;
            this.sek8Data = temp_data.sek8Data;
            this.sek5Data = temp_data.sek5Data;
            this.exhibitData = temp_data.exhibitData;
            this.floorPlanPath = temp_data.floorPlanPath;
            this.premiseLocationPath = temp_data.premiseLocationPath;
            this.general.destroyTempData();
        }
        else{
            this.router.navigate(['/manageIND']);
        }
        console.log(this.exhibitData);

        this.indForm = this.fb.group({
            ind_id: this.ind.ind_id,
            assignment_id: this.ind.assignment_id,
            p_close: this.general.convertIntToBool(this.ind.p_close),
            p_empty: this.general.convertIntToBool(this.ind.p_empty),
            p_cooperation: this.general.convertIntToBool(this.ind.p_cooperation),
            p_shortAddr: [this.ind.p_shortAddr, Validators.required],      
            po_name: this.ind.po_name,
            po_id: [this.ind.po_id, [Validators.pattern("^[0-9]{12,12}$")]],
            no_familyMember: [this.ind.no_familyMember, Validators.min(0)],
            no_fever: [this.ind.no_fever, Validators.min(0)],
            no_out_breeding: [this.ind.no_out_breeding, Validators.min(0)],
            no_in_breeding: [this.ind.no_in_breeding, Validators.min(0)],
            container_type: this.ind.container_type,
            no_pot_out_breeding: [this.ind.no_pot_out_breeding, Validators.min(0)],
            no_pot_in_breeding: [this.ind.no_pot_in_breeding, Validators.min(0)],
            act_abating: this.general.convertIntToBool(this.ind.act_abating),
            act_destroy: this.general.convertIntToBool(this.ind.act_destroy),
            act_education: this.general.convertIntToBool(this.ind.act_education),
            act_pamphlet: this.general.convertIntToBool(this.ind.act_pamphlet),
            coor_lat: this.ind.coor_lat,
            coor_lng: this.ind.coor_lng
        });
    }

    ngOnInit() {}

    submit(){
        console.log(this.indForm);
    }

    openModal(content, size) {
        this.modal = this.modalService.open(content, {
            backdrop: 'static',
            keyboard: false,
            size: size
        });
    }

    async openExhibitModal(content){
        const promisesArray: any[] = [];  
        this.loading = true;

        this.poDetailsForm = this.fb.group({
            exhibit_id: this.exhibitData.exhibit.exhibit_id,
            po_full_name: this.exhibitData.exhibit.po_full_name,
            po_ic_no: [this.exhibitData.exhibit.po_ic_no, [Validators.pattern("^[0-9]{12,12}$")]],
            acceptance: this.general.convertIntToBool(this.exhibitData.exhibit.acceptance)
        });
      
        this.exhibitForm = this.fb.group({
            type: ['', Validators.required],
            code: ['', Validators.required],
            img: ['', Validators.required]
        });

        let postData = this.general.getAuthObject();
        
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

        this.openModal(content, 'lg');
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
        
    scrollFix(){
        this.modal.result.catch(() => {})
            .then(() => {
                if (document.querySelector('body > .modal')) {
                    document.body.classList.add('modal-open');
                }
            });
    }

    submitExhibitItem(){
        let exhibitItem: ExhibitItem = new ExhibitItem();
        let imgFile = (this.exhibitForm.get('img').value)[0];
        let src = imgFile.imgSrc;
        
        exhibitItem.file     = imgFile; 
        exhibitItem.fileName = src;
        exhibitItem.type     = this.exhibitForm.get('type').value,
        exhibitItem.code     = this.exhibitForm.get('code').value
        
        console.log(exhibitItem);
        this.exhibitData.exhibitItems.push(exhibitItem);
        this.exhibitForm.reset();
    }

    removeExhibitItem(fileName){
        if(confirm("Confirm to delete this exhibit item?"))
            this.exhibitData.exhibitItems = this.exhibitData.exhibitItems.filter(item =>item.fileName != fileName);
    }

    downloadDrawing(type) {
        window.location.href = type.src;
    }

    // /// // /// // /// // /// // /// // /// // /// // /// // /// // /// // /// // 
    // //user for upload file to api
    // console.log(this.exhibitForm.get("img").errors);
    // let file = this.exhibitForm.get("img").value;

    // let auth_data = this.general.getAuthObject();
    // let postData = new FormData();

    // postData.append("token", auth_data.token);
    // postData.append("user_id", auth_data.user_id);
    // postData.append("exhibit_id", "301");
    // postData.append("code", "123");
    // postData.append("type", "123");     
    // postData.append("file", file[0]);   
    
    // this.auth.postData2(postData, "api/upload/exhibit_item").then((result) => {
    //     debugger;
    //     let responseData: any = result;
    // },
    // (err) => {
    //     alert("API error, please contact administrative person.");
    //     console.log("API error: " + JSON.stringify(err));
    // });
    // /// // /// // /// // /// // /// // /// // /// // /// // /// // /// // 
    // let file = new File([blob], "testing.png")
    // /// // /// // /// // /// // /// // /// // /// // /// // /// // /// //     
    // console.log(this.exhibitData);  

    //     let url = this.exhibitData.exhibit.floor_plan_URI;

    //     debugger;

    //     fetch(url)
    //         .then(res => res.blob()) // Gets the response and returns it as a blob
    //         .then(blob => {
    //             let data:any = blob
    //             // Here's where you get access to the blob
    //             // And you can use it for whatever you want
    //             // Like calling ref().put(blob)

    //             // // Here, I use it to make an image appear on the page
    //             // let objectURL = URL.createObjectURL(blob);
    //             // let myImage = new Image();
    //             // myImage.src = objectURL;
    //             // debugger;

    //             debugger;
    //             // console.log(this.exhibitForm.get("img").errors);
    //             // let file = this.exhibitForm.get("img").value;
                
                

    //             // let file = <File>data;

    //             let auth_data = this.general.getAuthObject();
    //             let postData = new FormData();

    //             postData.append("token", auth_data.token);
    //             postData.append("user_id", auth_data.user_id);
    //             postData.append("exhibit_id", "301");
    //             postData.append("code", "123");
    //             postData.append("type", "123");     
    //             postData.append("file", file);   
                
    //             this.auth.postData2(postData, "api/upload/exhibit_item").then((result) => {
    //                 debugger;
    //                 let responseData: any = result;
    //             },
    //             (err) => {
    //                 alert("API error, please contact administrative person.");
    //                 console.log("API error: " + JSON.stringify(err));
    //             });
}
