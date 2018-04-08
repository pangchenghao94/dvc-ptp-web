import { AddEditINDModule } from './addEdit-ind.module';

describe('AddEditINDModule', () => {
    let addEditINDModule: AddEditINDModule;

    beforeEach(() => {
        addEditINDModule = new AddEditINDModule();
    });

    it('should create an instance', () => {
        expect(addEditINDModule).toBeTruthy();
    });
});
