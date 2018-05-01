import { ManageReportModule } from './manage-report.module';

describe('ManageReportModule', () => {
    let manageReportModule: ManageReportModule;

    beforeEach(() => {
        manageReportModule = new ManageReportModule();
    });

    it('should create an instance', () => {
        expect(manageReportModule).toBeTruthy();
    });
});
