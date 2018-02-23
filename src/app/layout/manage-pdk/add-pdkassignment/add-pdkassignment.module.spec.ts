import { AddPDKAssignmentModule } from './add-pdkassignment.module';

describe('AddPDKAssignmentModule', () => {
    let addPDKAssignmentModule: AddPDKAssignmentModule;

    beforeEach(() => {
        addPDKAssignmentModule = new AddPDKAssignmentModule();
    });

    it('should create an instance', () => {
        expect(addPDKAssignmentModule).toBeTruthy();
    });
});
