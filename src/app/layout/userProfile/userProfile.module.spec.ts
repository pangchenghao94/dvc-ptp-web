import { UserProfileModule } from './userProfile.module';

describe('UserProfileModule', () => {
    let userProfileModule: UserProfileModule;

    beforeEach(() => {
        userProfileModule = new UserProfileModule();
    });

    it('should create an instance', () => {
        expect(userProfileModule).toBeTruthy();
    });
});
