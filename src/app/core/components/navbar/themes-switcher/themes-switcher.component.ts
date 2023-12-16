import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'sh-themes-switcher',
  standalone: true,
  imports: [],
  templateUrl: './themes-switcher.component.html',
  styleUrl: './themes-switcher.component.scss',
})
export class ThemesSwitcherComponent {
  public isLightTheme = false;

  public onThemeSwitch() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark')
  }

}
