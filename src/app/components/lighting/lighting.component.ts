import { Component, OnDestroy } from '@angular/core';
import { LightService } from "../../core/api/services/light.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { LightDto } from "../../core/api/models/light-dto";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { SensorsService } from "../../core/api/services/sensors.service";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { tap } from "rxjs/operators";

@Component({
  selector: 'sh-lighting',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './lighting.component.html',
  styleUrl: './lighting.component.scss'
})
export class LightingComponent implements OnDestroy {
  public lights: LightDto[] = [];
  public lightSensors: SensorDto[] = [];
  public loading = true;
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(private readonly lightService: LightService, private sensorsService: SensorsService) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
      this.lightService.lightControllerLightList({
        page: 0,
        limit: 100
      }).pipe(
        tap(data => this.loadingSubject.next(true)),
      ).subscribe(data => {
        this.lights = data.items || [];
        this.loadingSubject.next(false);
      }));
    this.subscription.add(
      this.sensorsService.sensorControllerSensorList({
        search: 'L_',
        limit: 50,
        page: 0
      }).pipe(
        tap(data => this.loadingSubject.next(true)),
      ).subscribe(data => {
        this.lightSensors = data.items || [];
        this.loadingSubject.next(false);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
