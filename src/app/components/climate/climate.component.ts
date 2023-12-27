import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { BehaviorSubject, forkJoin, interval, Observable, startWith, Subscription } from "rxjs";
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
export class ClimateComponent implements OnInit, OnDestroy {
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
  }

  ngOnInit(): void {
    this.subscription.add(
      interval(3000).pipe(
        startWith(0),
        switchMap(() => this.fetchSensorData())
      ).subscribe(([dhtData, smokeData]) => {
          this.dhtData = dhtData;
          this.smokeData = smokeData;
          this.loadingSubject.next(false);
        },
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchSensorData(): Observable<[DhtSensorDto[], SmokeSensorDto[]]> {
    return forkJoin([
      this.fetchDhtSensorData(),
      this.fetchSmokeSensorData()
    ]);
  }

  private fetchDhtSensorData(): Observable<DhtSensorDto[]> {
    return this.sensorsService.sensorControllerSensorList({
      page: 0,
      limit: 50,
      search: 'DHT_'
    }).pipe(
      map(data => data.items!),
      tap(data => this.dhtSensors = data || []),
      switchMap(sensors => {
        const observableArray = sensors.map(sensor =>
          this.dhtService.dhtSensorControllerGetLatestData({sensorId: sensor._id})
        );
        return forkJoin(observableArray);
      })
    );
  }

  private fetchSmokeSensorData(): Observable<SmokeSensorDto[]> {
    return this.sensorsService.sensorControllerSensorList({
      search: 'SMOKE_',
      page: 0,
      limit: 50,
    }).pipe(
      map(data => data.items!),
      tap(data => this.smokeSensors = data || []),
      switchMap(sensors => {
        const observableArray = sensors.map(sensor =>
          this.smokeService.smokeSensorControllerGetLatestData({sensorId: sensor._id})
        );
        return forkJoin(observableArray);
      })
    );
  }
}
