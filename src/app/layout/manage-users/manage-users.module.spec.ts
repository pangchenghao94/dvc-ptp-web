import { ManageUsersModule } from './manage-users.module';

describe('ManageUsersComponent', () => {
    let manageUsersModule: ManageUsersModule;

    beforeEach(() => {
        manageUsersModule = new ManageUsersModule();
    });

    it('should create an instance', () => {
        expect(ManageUsersModule).toBeTruthy();
    });
});
