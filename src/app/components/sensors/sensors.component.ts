import { Component, OnInit } from '@angular/core';
import { SensorsService } from "../../core/api/services/sensors.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { SensorDto } from "../../core/api/models/sensor-dto";
import { filter, map, tap } from "rxjs/operators";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { sensorTypeIconMap } from "./sensors.assets";
import { Router } from "@angular/router";
import { TableComponent } from "../../shared/components/table/table.component";

@Component({
  selector: 'sh-sensors',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    MatIconModule,
    TableComponent,
  ],
  templateUrl: './sensors.component.html',
  styleUrl: './sensors.component.scss'
})
export class SensorsComponent implements OnInit {
  public sensors: SensorDto[] = [];
  public loading = true;
  public sensorIconMap = sensorTypeIconMap;
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly sensorsService: SensorsService,
    private readonly router: Router,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.fetchSensors().subscribe(data => {
        this.sensors = data;
        this.loadingSubject.next(false);
      })
    )
  }

  public openSensorDetails(id: string): void {
    this.router.navigate(['/sensor-details', id]);
  }

  private fetchSensors(): Observable<SensorDto[]> {
    return this.sensorsService.sensorControllerSensorList({
      page: 0,
      limit: 500,
    }).pipe(
      tap(_ => this.loadingSubject.next(true)),
      filter(data => data.items !== undefined && data.items?.length > 0),
      map(data => data.items!),
    )
  }
}
