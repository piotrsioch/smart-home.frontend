import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sh-themes-switcher',
  templateUrl: './themes-switcher.component.html',
  styleUrls: ['./themes-switcher.component.scss']
})
export class ThemesSwitcherComponent {
  public isLightTheme = false;

  public onThemeSwitch() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute('data-theme', this.isLightTheme ? 'light' : 'dark')
  }

}
