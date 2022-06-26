import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogMock } from '../../mocks/mat-dialog-mock';
import { MatSnackBarMock } from '../../mocks/snack-bar-mock';
import { WatchServiceMock } from '../../mocks/watch-service-mock';
import { WatchService } from '../../services/watch.service';

import { DashBoardComponent } from './dash-board.component';

describe('DashBoardComponent', () => {
  let component: DashBoardComponent;
  let fixture: ComponentFixture<DashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashBoardComponent ], 
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: WatchService, useClass: WatchServiceMock },
        { provide: MatSnackBar, useClass: MatSnackBarMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
