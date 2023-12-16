import { Component } from '@angular/core';
import { RootLayoutComponent } from "./core/components/root-layout/root-layout.component";
import { HttpClientModule } from "@angular/common/http";

@Component({
  selector: 'sh-root',
  standalone: true,
  imports: [HttpClientModule, RootLayoutComponent],
  template: '<sh-root-layout></sh-root-layout>>'
})
export class AppComponent {
}
