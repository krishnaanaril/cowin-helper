import { of } from "rxjs";

export class MatSnackBarMock {
    open() {
        return {
            onAction: () => of({})
        }
    }

}