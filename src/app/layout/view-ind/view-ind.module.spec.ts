import { ViewINDModule } from './view-ind.module';

describe('ViewINDModule', () => {
    let viewINDModule: ViewINDModule;

    beforeEach(() => {
        viewINDModule = new ViewINDModule();
    });

    it('should create an instance', () => {
        expect(viewINDModule).toBeTruthy();
    });
});
