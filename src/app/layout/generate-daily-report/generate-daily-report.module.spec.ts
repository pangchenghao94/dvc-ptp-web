import { GenerateDailyReportModule } from './generate-daily-report.module';

describe('GenerateDailyReportModule', () => {
    let generateDailyReportModule: GenerateDailyReportModule;

    beforeEach(() => {
        generateDailyReportModule = new GenerateDailyReportModule();
    });

    it('should create an instance', () => {
        expect(generateDailyReportModule).toBeTruthy();
    });
});
