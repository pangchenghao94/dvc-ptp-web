import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'user-profile',
    templateUrl: './UserProfile.component.html',
    styleUrls: ['./UserProfile.component.scss'],
    animations: [routerTransition()]            
})
export class UserProfileComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
