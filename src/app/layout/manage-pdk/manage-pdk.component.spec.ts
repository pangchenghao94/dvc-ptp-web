import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePDKComponent } from './manage-pdk.component';

describe('ManagePDKComponent', () => {
    let component: ManagePDKComponent;
    let fixture: ComponentFixture<ManagePDKComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ManagePDKComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagePDKComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
