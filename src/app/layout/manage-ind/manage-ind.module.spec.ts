import { ManageINDModule } from './manage-ind.module';

describe('ManageINDModule', () => {
    let manageINDModule: ManageINDModule;

    beforeEach(() => {
        manageINDModule = new ManageINDModule();
    });

    it('should create an instance', () => {
        expect(manageINDModule).toBeTruthy();
    });
});
