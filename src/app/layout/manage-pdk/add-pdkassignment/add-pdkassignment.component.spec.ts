import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPDKAssignmentComponent } from './add-pdkassignment.component';

describe('AddPDKAssignmentComponent', () => {
    let component: AddPDKAssignmentComponent;
    let fixture: ComponentFixture<AddPDKAssignmentComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AddPDKAssignmentComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AddPDKAssignmentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
