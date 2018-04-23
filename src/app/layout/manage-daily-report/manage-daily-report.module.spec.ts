import { ManageDailyReportModule } from './manage-daily-report.module';

describe('ManageDailyReportModule', () => {
    let manageDailyReportModule: ManageDailyReportModule;

    beforeEach(() => {
        manageDailyReportModule = new ManageDailyReportModule();
    });

    it('should create an instance', () => {
        expect(manageDailyReportModule).toBeTruthy();
    });
});
