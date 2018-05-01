import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDailyReportComponent } from './generate-daily-report.component';

describe('GenerateDailyReportComponent', () => {
    let component: GenerateDailyReportComponent;
    let fixture: ComponentFixture<GenerateDailyReportComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [GenerateDailyReportComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(GenerateDailyReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
