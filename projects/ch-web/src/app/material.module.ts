import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
