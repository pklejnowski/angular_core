import { TestBed, inject } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
describe('AuthGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthGuard]
        });
    });
    it('should ...', inject([AuthGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=auth.guard.spec.js.map