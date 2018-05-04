import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, GeneralService, CustomNgbDateParseFormatter } from '../../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { InD } from '../../shared/class/model/ind';
import { NgbDateStruct, NgbTimeStruct, NgbDateParserFormatter, NgbModal, NgbModalRef, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { ExhibitItem } from '../../shared/class/model/exhibit_item';
import { Exhibit } from '../../shared/class/model/exhibit';
import { Sek5 } from '../../shared/class/model/sek5';
import { Sek8 } from '../../shared/class/model/sek8';

@Component({
    providers: [{provide: NgbDateParserFormatter, useClass: CustomNgbDateParseFormatter}],    
    selector: 'addEdit-ind',
    templateUrl: './addEdit-ind.component.html',
    styleUrls: ['./addEdit-ind.component.scss'],
    animations: [routerTransition()]            
})
export class AddEditINDComponent implements OnInit {
    @ViewChild('modalEditConfirmation') modalEditConfirmation: ElementRef;

    mode: any;
    indForm: FormGroup;
    poDetailsForm: FormGroup;
    exhibitForm: FormGroup;
    sek8Form: FormGroup;
    sek5Form: FormGroup;
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
    auth_data : any;

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

        this.indForm = this.fb.group({
            ind_id: this.ind.ind_id,
            assignment_id: this.ind.assignment_id,
            area_inspection: this.general.convertIntToBool(this.ind.area_inspection),
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
            abating_amount : this.ind.abating_amount,
            abating_measure_type : this.ind.abating_measure_type,
            act_destroy: this.ind.act_destroy,
            act_education: this.general.convertIntToBool(this.ind.act_education),
            act_pamphlet: this.general.convertIntToBool(this.ind.act_pamphlet),
            coor_lat: this.ind.coor_lat,
            coor_lng: this.ind.coor_lng
        });

        this.poDetailsForm = this.fb.group({
            exhibit_id: '',
            po_full_name: '',
            po_ic_no: ['', [Validators.pattern("^[0-9]{12,12}$")]],
            acceptance: ''
        });
        
        this.exhibitForm = this.fb.group({
            type: ['', Validators.required],
            code: ['', Validators.required],
            img: ['', Validators.required]
        });

        this.sek8Form = this.fb.group({
            sek8_id: '',
            checking_date: ['', Validators.required],
            chkbx1: [false, Validators.required],
            chkbx2: [false, Validators.required],
            chkbx3: [false, Validators.required],
            chkbx4: [false, Validators.required],
            chkbx5: [false, Validators.required],
            chkbx6: [false, Validators.required],
            chkbx7: [false, Validators.required],
            chkbx8: [false, Validators.required],
            chkbx9: [false, Validators.required],
            chkbx10: [false, Validators.required],
            chkbx11: [false, Validators.required],
            chkbx12: [false, Validators.required],
            chkbx13: [false, Validators.required],
            remark: ''
        });

        this.sek5Form = this.fb.group({
            sek5_id: '',
            date: ['', Validators.required],
            time: ['', Validators.required],
            remark: ''
        });
    }

    async ngOnInit() {
        this.auth_data = this.general.getAuthObject();

        if(this.exhibitData){
            this.poDetailsForm.patchValue({
                exhibit_id: this.exhibitData.exhibit.exhibit_id,
                po_full_name: this.exhibitData.exhibit.po_full_name,
                po_ic_no: this.exhibitData.exhibit.po_ic_no,
                acceptance: this.exhibitData.exhibit.acceptance
            });

            const promisesArray: any[] = [];  
            this.loading = true;

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
                        // this.convertURLToFile();
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
        }

        if(this.sek5Data){
            this.sek5Form.patchValue({
                sek5_id: this.sek5Data.sek5_id,
                date: this.general.toNgbDateStruct(this.sek5Data.date),
                time: this.general.toNgbTimeStruct(this.sek5Data.time),
                remark: this.sek5Data.remark
            });
        }

        if(this.sek8Data){
            this.sek8Form.patchValue({
                sek8_id: this.sek8Data.sek8_id,
                checking_date: this.general.toNgbDateStruct(this.sek8Data.checking_date),
                chkbx1: this.sek8Data.chkbx1,
                chkbx2: this.sek8Data.chkbx2,
                chkbx3: this.sek8Data.chkbx3,
                chkbx4: this.sek8Data.chkbx4,
                chkbx5: this.sek8Data.chkbx5,
                chkbx6: this.sek8Data.chkbx6,
                chkbx7: this.sek8Data.chkbx7,
                chkbx8: this.sek8Data.chkbx8,
                chkbx9: this.sek8Data.chkbx9,
                chkbx10: this.sek8Data.chkbx10,
                chkbx11: this.sek8Data.chkbx11,
                chkbx12: this.sek8Data.chkbx12,
                chkbx13: this.sek8Data.chkbx13,
                remark: this.sek8Data.remark,
            });
        }
    }

    async convertURLToFile(){
        const promisesArray: any[] = [];  
        this.loading = true;
        
        promisesArray.push(
            fetch(this.exhibitData.exhibit.floor_plan_URI)
                .then(res => res.blob())
                .then(blob => {
                    let data: any = blob
                    this.exhibitData.exhibit.floor_plan_file = <File>data;
                })
        );

        promisesArray.push(
            fetch(this.exhibitData.exhibit.premise_location_URI)
                .then(res => res.blob())
                .then(blob => {
                    let data: any = blob
                    this.exhibitData.exhibit.premise_location_file = <File>data;
                })
            );

        for(let i = 0; i < this.exhibitData.exhibitItems.length; i++){
            let item = this.exhibitData.exhibitItems[i];
        
            promisesArray.push(
                fetch(item.fileName)
                    .then(res => res.blob())
                    .then(blob => {
                        let data: any = blob
                        item.file = <File>data;
                    })
                );
        }
        
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


    submit(){
        this.openModal(this.modalEditConfirmation, null);
    }

    getIndFormData(){
        let data: InD             = new InD();
        data.ind_id               = this.indForm.get("ind_id").value;    
        data.assignment_id        = this.indForm.get("assignment_id").value;
        data.area_inspection      = this.indForm.get("area_inspection").value;
        data.p_close              = this.indForm.get("p_close").value;
        data.p_empty              = this.indForm.get("p_empty").value;
        data.p_cooperation        = this.indForm.get("p_cooperation").value;
        data.p_shortAddr          = this.indForm.get("p_shortAddr").value;
        data.po_name              = this.indForm.get("po_name").value;
        data.po_id                = this.indForm.get("po_id").value;
        data.no_familyMember      = this.indForm.get("no_familyMember").value;
        data.no_fever             = this.indForm.get("no_fever").value;
        data.no_out_breeding      = this.indForm.get("no_out_breeding").value;
        data.no_in_breeding       = this.indForm.get("no_in_breeding").value;
        data.container_type       = this.indForm.get("container_type").value;
        data.no_pot_out_breeding  = this.indForm.get("no_pot_out_breeding").value;
        data.no_pot_in_breeding   = this.indForm.get("no_pot_in_breeding").value;
        data.abating_amount       = this.indForm.get("abating_amount").value;
        data.abating_measure_type = this.indForm.get("abating_measure_type").value;        
        data.act_destroy          = this.indForm.get("act_destroy").value;
        data.act_education        = this.indForm.get("act_education").value;
        data.act_pamphlet         = this.indForm.get("act_pamphlet").value;
        data.coor_lat             = this.indForm.get("coor_lat").value;
        data.coor_lng             = this.indForm.get("coor_lng").value;  
        
        return data;
    }

    getExhibitData(){
        let justExhibit: Exhibit  = new Exhibit();
        justExhibit.exhibit_id    = this.poDetailsForm.get('exhibit_id').value;
        justExhibit.po_full_name  = this.poDetailsForm.get('po_full_name').value;
        justExhibit.po_ic_no      = this.poDetailsForm.get('po_ic_no').value;
        justExhibit.acceptance    = this.poDetailsForm.get('acceptance').value;
        
        return justExhibit;
    }

    getSek5Data(){
        let sek5: Sek5 = new Sek5();

        sek5.sek5_id = this.sek5Form.get('sek5_id').value;
        sek5.appointment_date   = this.general.toMySqlDateStr(this.sek5Form.get('date').value, this.sek5Form.get('time').value);
        sek5.remark = this.sek5Form.get('remark').value;
        
        return sek5;
    }
    
    getSek8Data(){
        let sek8: Sek8 = new Sek8();

        sek8.sek8_id = this.sek8Form.get('sek8_id').value;
        sek8.checking_date = this.general.toMySqlDateStr(this.sek8Form.get('checking_date').value);
        sek8.chkbx1 = this.sek8Form.get('chkbx1').value;
        sek8.chkbx2 = this.sek8Form.get('chkbx2').value;
        sek8.chkbx3 = this.sek8Form.get('chkbx3').value;
        sek8.chkbx4 = this.sek8Form.get('chkbx4').value;
        sek8.chkbx5 = this.sek8Form.get('chkbx5').value;
        sek8.chkbx6 = this.sek8Form.get('chkbx6').value;
        sek8.chkbx7 = this.sek8Form.get('chkbx7').value;
        sek8.chkbx8 = this.sek8Form.get('chkbx8').value;
        sek8.chkbx9 = this.sek8Form.get('chkbx9').value;
        sek8.chkbx10 = this.sek8Form.get('chkbx10').value;
        sek8.chkbx11 = this.sek8Form.get('chkbx11').value;
        sek8.chkbx12 = this.sek8Form.get('chkbx12').value;
        sek8.chkbx13 = this.sek8Form.get('chkbx13').value;
        sek8.remark = this.sek8Form.get('remark').value;

        return sek8;
    }

    async editInd(){
        const promisesArray: any[] = [];          
        this.loading = true;
        this.modal.close();

        if (this.exhibitData != null){
        
            promisesArray.push(
                fetch(this.exhibitData.exhibit.floor_plan_URI)
                    .then(res => res.blob())
                    .then(blob => {
                        let data: any = blob;
                        let file = new File([blob], "testing.png");
                        this.exhibitData.exhibit.floor_plan_file = file;
                    })
            );
    
            promisesArray.push(
                fetch(this.exhibitData.exhibit.premise_location_URI)
                    .then(res => res.blob())
                    .then(blob => {
                        let data: any = blob;
                        let file = new File([blob], "testing.png");                        
                        this.exhibitData.exhibit.premise_location_file = file;
                    })
                );
    
            for(let i = 0; i < this.exhibitData.exhibitItems.length; i++){
                let item = this.exhibitData.exhibitItems[i];
                
                if(item.file == null)
                    promisesArray.push(
                        fetch(item.fileName)
                            .then(res => res.blob())
                            .then(blob => {
                                let data: any = blob;
                                let file = new File([blob], "testing.jpg");                        
                                item.file = file;
                            })
                        );
            }
        }
        
        if (promisesArray.length != 0) {
            await Promise.all(promisesArray)
                .then((res) => {
                    this.editInd2();
                },
                (firstErr) => {
                    this.loading = false;
                    alert("Fail to upload photos. Please contact system administrator.");
                    console.log(firstErr);
                });
        }
        else{
            this.editInd2();
        }
    }

    async editInd2(){
        const promisesArray: any[] = [];          
        this.loading = true;

        let postData = this.general.getAuthObject();
        postData.data = this.getIndFormData();

        if (this.sek5Data != null)
            postData.sek5Data = this.getSek5Data();
        if (this.sek8Data != null)
            postData.sek8Data = this.getSek8Data();
        if (this.exhibitData != null)
            postData.exhibitData = this.getExhibitData();

        this.auth.postData(postData, "api/ind/update").then(async (result) => {
            let responseData: any = result;

            if (responseData.status == "0") {
                alert(responseData.message);
                throw new Error("Not authorized!");
            }
            else {
                if (responseData.error) {
                    alert(responseData.error.text);
                    throw new Error(responseData.error.text);
                }
                else {
                    if (this.exhibitData != null) {
                        let exhibit_id = this.exhibitData.exhibit.exhibit_id;

                        const promisesArray: any[] = [];

                        promisesArray.push(
                            this.uploadFloorPlan(exhibit_id, this.exhibitData.exhibit.floor_plan_file)
                        );

                        promisesArray.push(
                            this.uploadPremiseLocation(exhibit_id, this.exhibitData.exhibit.premise_location_file)
                        );

                        this.exhibitData.exhibitItems.forEach(item => {
                            promisesArray.push(
                                this.uploadExhibititem(exhibit_id, item)
                            );
                        });

                        await Promise.all(promisesArray)
                            .then((res) => {
                                this.loading = false;                                    
                                alert("I&D has been edited successfully");
                                this.router.navigate(['/manageIND']);

                            },
                                (firstErr) => {
                                    this.loading = false;
                                    alert(firstErr);
                                    console.error("Error uploading file.", firstErr);
                                });
                    }
                    else {
                        this.loading = false;
                        alert("I&D has been edited successfully");                            
                        this.router.navigate(['/manageIND']);                            
                    }
                }
            }
        },
        (err) => {
            this.loading = false;
            alert("API error, please contact administrative person.");
            console.log("API error: " + JSON.stringify(err));
        });
    }


    uploadFloorPlan(exhibit_id, file) {
        let postData = new FormData();

        postData.append("token", this.auth_data.token);
        postData.append("user_id", this.auth_data.user_id);
        postData.append("exhibit_id", exhibit_id);
        postData.append("file", file);   
        console.log(file);
        return this.auth.postData2(postData, "api/upload/floor_plan_drawing").then((result) => {
            let responseData: any = result;
        },
        (err) => {
            alert("API error, please contact administrative person.");
            console.log(err);
            throw new Error("Fail to upload floor plan drawing");
        });
    }

    uploadPremiseLocation(exhibit_id, file) {
        let postData = new FormData();

        postData.append("token", this.auth_data.token);
        postData.append("user_id", this.auth_data.user_id);
        postData.append("exhibit_id", exhibit_id);
        postData.append("file", file);   
        console.log(file);
        
        return this.auth.postData2(postData, "api/upload/premise_location_drawing").then((result) => {
            let responseData: any = result;
        },
        (err) => {
            alert("API error, please contact administrative person.");
            console.log(err);
            throw new Error("Fail to upload premise location drawing.");
        });
    }

    uploadExhibititem(exhibit_id, item) {
        let postData = new FormData();

        postData.append("token", this.auth_data.token);
        postData.append("user_id", this.auth_data.user_id);
        postData.append("code", item.code);
        postData.append("type", item.type);     
        postData.append("exhibit_id", exhibit_id);
        postData.append("file", item.file);   
        console.log(item.file);
        
        return this.auth.postData2(postData, "api/upload/exhibit_item").then((result) => {
            let responseData: any = result;
        },
        (err) => {
            alert("API error, please contact administrative person.");
            console.log(err);
            throw new Error("Fail to upload premise location drawing.");
        });
    }

    openModal(content, size) {
        this.modal = this.modalService.open(content, {
            keyboard: false,
            size: size
        });
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
        console.log(imgFile);
        exhibitItem.file     = imgFile; 
        exhibitItem.fileName = src;
        exhibitItem.type     = this.exhibitForm.get('type').value,
        exhibitItem.code     = this.exhibitForm.get('code').value
        
        this.exhibitData.exhibitItems.push(exhibitItem);
        this.exhibitForm.reset();
    }

    removeExhibitItem(fileName){
        if(confirm("Confirm to delete this exhibit item?")){
            if(this.exhibitData.exhibitItems.length > 1)
                this.exhibitData.exhibitItems = this.exhibitData.exhibitItems.filter(item =>item.fileName != fileName);
            else
                alert("Exhibit Item cannot be empty! Aborting Delete.");
        }
    }

    downloadDrawing(type) {
        window.location.href = type.src;
    }

    testing(){
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
