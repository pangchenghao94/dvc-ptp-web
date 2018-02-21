import { ManagePDKModule } from './manage-pdk.module';

describe('ManagePDKModule', () => {
    let managePDKModule: ManagePDKModule;

    beforeEach(() => {
        managePDKModule = new ManagePDKModule();
    });

    it('should create an instance', () => {
        expect(managePDKModule).toBeTruthy();
    });
});
