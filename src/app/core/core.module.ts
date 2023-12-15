import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootLayoutComponent } from './components/root-layout/root-layout.component';
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    RootLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    RootLayoutComponent
  ]
})
export class CoreModule { }
