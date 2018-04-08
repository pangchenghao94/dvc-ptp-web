import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewINDComponent } from './view-ind.component';

describe('ViewINDComponent', () => {
    let component: ViewINDComponent;
    let fixture: ComponentFixture<ViewINDComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [ViewINDComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ViewINDComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
