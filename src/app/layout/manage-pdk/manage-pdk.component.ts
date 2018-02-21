import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService, UserType, GeneralService } from '../../shared';
import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-blank-page',
    templateUrl: './manage-pdk.component.html',
    styleUrls: ['./manage-pdk.component.scss'],
    animations: [routerTransition()]    
})
export class ManagePDKComponent implements OnInit {
    constructor(private modalService: NgbModal, private fb: FormBuilder) {}

    ngOnInit() {}
    submit(){}
}
