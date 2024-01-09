import { Component, ViewChild } from '@angular/core';
import { LoaderComponent } from "../../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { BehaviorSubject, Observable, of, Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { SensorsService } from "../../../core/api/services/sensors.service";
import { ModalService } from "../../../shared/services/modal.service";
import { filter, map, tap } from "rxjs/operators";
import { RoomDto } from "../../../core/api/models/room-dto";
import { RoomService } from "../../../core/api/services/room.service";
import { EditSensorModalComponent, EditSensorModalReturnData } from "../edit-sensor-modal/edit-sensor-modal.component";
import { sensorsTypesMap } from "../sensors.assets";
import { TableComponent } from "../../../shared/components/table/table.component";
import { SensorsHelperService } from "../../../shared/services/sensors-helper.service";
import { CustomDatasource, PageChangedData, TableColumn } from "../../../shared/components/table/table.assets";

export interface EditSensorModalData {
  sensor: SensorDto;
}

@Component({
  selector: 'sh-sensor-details',
  standalone: true,
  imports: [LoaderComponent, CommonModule, TableComponent],
  templateUrl: './sensor-details.component.html',
  styleUrl: './sensor-details.component.scss'
})
export class SensorDetailsComponent {
  public sensor: SensorDto;
  public loading = true;
  public room: RoomDto;
  public sensorTypesMap = sensorsTypesMap;
  public sensorColumns: TableColumn[] = [];
  public sensorData: CustomDatasource = { data: [], total: 0 };
  public totalItemCount = 0;

  private loadingSubject = new BehaviorSubject<boolean>(true);
  private readonly subscription = new Subscription();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
    private readonly roomService: RoomService,
    private readonly sensorHelperService: SensorsHelperService,
  ) {
    this.loadingSubject.subscribe(isLoading => {
      this.loading = isLoading;
    })

    this.subscription.add(
      this.fetchSensorData().subscribe(data => {
        if (data) {
          this.room = data;
        }
        this.loadingSubject.next(false);

        //TODO REFACTOR
        this.fetchDataForTable(this.sensor, 0, 5);
        this.sensorColumns = this.sensorHelperService.getSensorColumns(this.sensor.type);
        //TODO REFACTOR
      })
    )
  }

  editSensor(): void {
    const modalRef =
      this.modalService.open<EditSensorModalComponent, EditSensorModalData, EditSensorModalReturnData>(
        EditSensorModalComponent, {
          data: {
            sensor: this.sensor,
          },
        });

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        tap(_ => this.loadingSubject.next(true)),
        switchMap(data => this.sensorsService.sensorControllerEditSensor({
          body: {
            id: this.sensor._id,
            name: data?.name || '',
            location: data?.location || '',
          }
        })),
        switchMap(_ => this.fetchSensorData()),
      ).subscribe(_ => this.loadingSubject.next(false))
    )
  }

  handlePageChange(event: PageChangedData): void {
    const currentPage = event.pageIndex;
    const perPage = event.pageSize;

    this.fetchDataForTable(this.sensor, currentPage, perPage);
  }

  private fetchSensorData(): Observable<RoomDto | null> {
    return this.sensorsService.sensorControllerGetById({
      id: this.route.snapshot.paramMap.get('id')!,
    }).pipe(
      tap(_ => this.loadingSubject.next(true)),
      tap(data => this.sensor = data),
      switchMap(data => {
        if (!data.roomId) {
          return of(null);
        }

        return this.roomService.roomControllerGetRoomById({
          id: data.roomId,
        })
      })
    )
  }

  private fetchDataForTable(sensor: SensorDto, page: number, limit: number) {
    this.sensorHelperService.getPaginatedData(sensor.type, {
      page,
      limit,
    }).pipe(
      map(data => {
          return {
            items: data.items!,
            total: data.total,
          }
        }
      ),
    ).subscribe(data => {
      this.sensorData = {data: data.items, total: data.total};
      this.totalItemCount = data.total;
    });
  }
}
