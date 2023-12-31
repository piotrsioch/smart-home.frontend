import { Component } from '@angular/core';
import { RootLayoutComponent } from "./core/components/root-layout/root-layout.component";
import { HttpClientModule } from "@angular/common/http";
import { ApiModule } from "./core/api/api.module";
import { IconService } from "./shared/services/icon.service";

@Component({
  selector: 'sh-root',
  standalone: true,
  imports: [HttpClientModule, RootLayoutComponent, ApiModule],
  template: '<sh-root-layout/>'
})
export class AppComponent {
  constructor(private iconService: IconService) {
    this.iconService.registerIcons();
  }
}
