import { Component, OnDestroy } from '@angular/core';
import { LightService } from "../../core/api/services/light.service";
import { BehaviorSubject, forkJoin, Subscription } from "rxjs";
import { LightDto } from "../../core/api/models/light-dto";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { SensorsService } from "../../core/api/services/sensors.service";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { map, switchMap, tap } from "rxjs/operators";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { ToggleComponent } from "../../shared/components/toggle/toggle.component";

@Component({
  selector: 'sh-lighting',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    MatSlideToggleModule,
    ToggleComponent,
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
      this.sensorsService.sensorControllerSensorList({
        search: 'L_',
        limit: 50,
        page: 0
      }).pipe(
        tap(data => {
          this.loadingSubject.next(true);
          this.lightSensors = data.items || [];
        }),
        map(data => data.items!),
        switchMap(sensors => {
          const observableArray = sensors.map(sensor =>
            this.lightService.lightControllerGetLightState({sensorId: sensor._id})
          );
          return forkJoin(observableArray);
        })
      ).subscribe(data => {
        this.lights = data || [];
        this.loadingSubject.next(false);
      })
    )
  }

  handleStateChange(event:any, light: LightDto, index: number) {
    this.lightService.lightControllerChangeLightState({
      body: {
        sensorId: light.sensorId
      },
    }).subscribe(data => {
      this.lights[index] = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
