import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditINDComponent } from './addEdit-ind.component';

describe('AddEditINDComponent', () => {
    let component: AddEditINDComponent;
    let fixture: ComponentFixture<AddEditINDComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [AddEditINDComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AddEditINDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
