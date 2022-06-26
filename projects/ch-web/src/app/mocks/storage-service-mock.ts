import { of } from "rxjs";

export class IdbServiceMock {
    setItem(key: string, val: any) {
        return of();
      }
    
      updateItem(key: string, val: any) {
        return of();
      }
    
      getItem(key: string) {
        return of();
      }
    
      deleteItem(key: string) {
        return of();
      }
}