import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDailyReportComponent } from './manage-daily-report.component';

describe('ManageDailyReportComponent', () => {
    let component: ManageDailyReportComponent;
    let fixture: ComponentFixture<ManageDailyReportComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ManageDailyReportComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ManageDailyReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
