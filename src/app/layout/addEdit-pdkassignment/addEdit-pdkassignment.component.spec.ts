import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPDKAssignmentComponent } from './addEdit-pdkassignment.component';

describe('AddEditPDKAssignmentComponent', () => {
    let component: AddEditPDKAssignmentComponent;
    let fixture: ComponentFixture<AddEditPDKAssignmentComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AddEditPDKAssignmentComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditPDKAssignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
