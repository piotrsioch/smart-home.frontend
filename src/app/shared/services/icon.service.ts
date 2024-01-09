import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface SvgIcon {
  name: string;
  path: string;
}

@Injectable({
  providedIn: 'root',
})
export class IconService {

  public icons: SvgIcon[] = [
    { name: 'alarm', path: '../../../assets/icons/alarm.svg' },
    { name: 'attic', path: '../../../assets/icons/attic.svg' },
    { name: 'balcony', path: '../../../assets/icons/balcony.svg' },
    { name: 'basement', path: '../../../assets/icons/basement.svg' },
    { name: 'bathroom', path: '../../../assets/icons/bathroom.svg' },
    { name: 'bedroom', path: '../../../assets/icons/bedroom.svg' },
    { name: 'dht-sensor', path: '../../../assets/icons/dht-sensor.svg' },
    { name: 'garage', path: '../../../assets/icons/garage.svg' },
    { name: 'garden', path: '../../../assets/icons/garden.svg' },
    { name: 'gym', path: '../../../assets/icons/gym.svg' },
    { name: 'hallway', path: '../../../assets/icons/hallway.svg' },
    { name: 'home', path: '../../../assets/icons/home.svg' },
    { name: 'home-office', path: '../../../assets/icons/home-office.svg' },
    { name: 'kitchen', path: '../../../assets/icons/kitchen.svg' },
    { name: 'laundry-room', path: '../../../assets/icons/laundry-room.svg' },
    { name: 'light', path: '../../../assets/icons/light.svg' },
    { name: 'living-room', path: '../../../assets/icons/living-room.svg' },
    { name: 'pir-sensor', path: '../../../assets/icons/pir-sensor.svg' },
    { name: 'play-room', path: '../../../assets/icons/play-room.svg' },
    { name: 'reed-switch', path: '../../../assets/icons/reed-switch.svg' },
    { name: 'smoke-sensor', path: '../../../assets/icons/smoke-sensor.svg' },
    { name: 'storage-room', path: '../../../assets/icons/storage-room.svg' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  public registerIcons(): void {
    this.icons.forEach(icon => {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(icon.path)
      );
    });
  }
}
