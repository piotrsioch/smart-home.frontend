import { Component, OnDestroy } from '@angular/core';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { BehaviorSubject, forkJoin, Subscription } from "rxjs";
import { CommonModule } from "@angular/common";
import { DhtSensorService } from "../../core/api/services/dht-sensor.service";
import { SensorsService } from "../../core/api/services/sensors.service";
import { map, switchMap, tap } from "rxjs/operators";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { DhtSensorDto } from "../../core/api/models/dht-sensor-dto";
import { SmokeSensorDto } from "../../core/api/models/smoke-sensor-dto";
import { SmokeSensorService } from "../../core/api/services/smoke-sensor.service";

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
export class ClimateComponent implements OnDestroy {
  public dhtSensors: SensorDto[] = [];
  public dhtData: DhtSensorDto[] = [];
  public smokeSensors: SensorDto[] = [];
  public smokeData: SmokeSensorDto[] = [];
  public loading = true;
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly dhtService: DhtSensorService,
    private readonly sensorsService: SensorsService,
    private readonly smokeService: SmokeSensorService,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
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
        this.loadingSubject.next(false);
      })
    );

    this.subscription.add(
      this.sensorsService.sensorControllerSensorList({
        search: 'SMOKE_',
        page: 0,
        limit: 50,
      }).pipe(
        map(data => data.items!),
        tap(data => {
          this.smokeSensors = data || [];
          this.loadingSubject.next(true);
        }),
        switchMap(sensors => {
          const observableArray = sensors.map(sensor => {
            return this.smokeService.smokeSensorControllerGetLatestData({
              sensorId: sensor._id,
            });
          })

          return forkJoin(observableArray);
        })
      ).subscribe(data => {
        this.smokeData = data;
        this.loadingSubject.next(false);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
