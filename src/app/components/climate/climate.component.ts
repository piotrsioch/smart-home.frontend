import { Component } from '@angular/core';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { BehaviorSubject, forkJoin, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { DhtSensorService } from "../../core/api/services/dht-sensor.service";
import { SensorsService } from "../../core/api/services/sensors.service";
import { map, switchMap, tap } from "rxjs/operators";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { DhtSensorDto } from "../../core/api/models/dht-sensor-dto";

@Component({
  selector: 'sh-climate',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './climate.component.html',
  styleUrl: './climate.component.scss'
})
export class ClimateComponent {
  public dhtSensors: SensorDto[] = [];
  public dhtData: DhtSensorDto[] = [];
  public loading = true;
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly dhtService: DhtSensorService,
    private readonly sensorsService: SensorsService
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.sensorsService.sensorControllerSensorList({
      page: 0,
      limit: 50,
      search: 'DHT_'
    }).pipe(
      tap(data => {
        this.loadingSubject.next(true);
        this.dhtSensors = data.items || [];
      }),
      map(data => data.items!),
      switchMap(sensors => {
        const observableArray = sensors.map(sensor =>
          this.dhtService.dhtSensorControllerGetLatestData({
            sensorId: sensor._id
          })
        );

        return forkJoin(observableArray);
      })
    ).subscribe(data => {
      this.dhtData = data;

    })
  }
}
