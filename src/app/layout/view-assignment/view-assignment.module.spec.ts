import { ViewAssignmentModule } from './view-assignment.module';

describe('ViewAssignmentModule', () => {
    let viewAssignmentModule: ViewAssignmentModule;

    beforeEach(() => {
        viewAssignmentModule = new ViewAssignmentModule();
    });

    it('should create an instance', () => {
        expect(viewAssignmentModule).toBeTruthy();
    });
});
