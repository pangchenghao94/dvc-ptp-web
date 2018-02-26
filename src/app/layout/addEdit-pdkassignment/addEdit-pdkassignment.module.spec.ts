import { AddEditPDKAssignmentModule } from './addEdit-pdkassignment.module';

describe('AddEditPDKAssignmentModule', () => {
    let addEditPDKAssignmentModule: AddEditPDKAssignmentModule;

    beforeEach(() => {
        addEditPDKAssignmentModule = new AddEditPDKAssignmentModule();
    });

    it('should create an instance', () => {
        expect(addEditPDKAssignmentModule).toBeTruthy();
    });
});
