import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootLayoutComponent } from './components/root-layout/root-layout.component';
import { RouterModule } from "@angular/router";
import { NavbarComponent } from './components/navbar/navbar.component';
import { ThemesSwitcherComponent } from './components/navbar/themes-switcher/themes-switcher.component';



@NgModule({
  declarations: [
    RootLayoutComponent,
    NavbarComponent,
    ThemesSwitcherComponent
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
