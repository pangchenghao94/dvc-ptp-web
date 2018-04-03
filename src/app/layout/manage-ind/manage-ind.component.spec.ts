import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageINDComponent } from './manage-ind.component';

describe('ManageINDComponent', () => {
    let component: ManageINDComponent;
    let fixture: ComponentFixture<ManageINDComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ManageINDComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageINDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
