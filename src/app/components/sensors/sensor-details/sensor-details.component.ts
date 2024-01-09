import { Component, OnDestroy } from '@angular/core';
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
import {
  GetPaginatedSensorData,
  SensorsHelperService
} from "../../../shared/services/sensors-helper.service";
import {
  CustomDatasource,
  PageChangedData,
  TableColumn,
  TablePaginatedListInput
} from "../../../shared/components/table/table.assets";

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
export class SensorDetailsComponent implements OnDestroy {
  public sensor: SensorDto;
  public loading = true;
  public room: RoomDto;
  public sensorTypesMap = sensorsTypesMap;
  public sensorColumns: TableColumn[] = [];
  public sensorData: CustomDatasource = {
    data: [],
    total: 0
  };
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
        this.sensorData = {
          data: data.items,
          total: data.total
        };

        this.totalItemCount = data.total;
        this.loadingSubject.next(false);

        this.sensorColumns = this.sensorHelperService.getSensorColumns(this.sensor.type);
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
    const orderField = event.orderField;
    const orderDirection = event.orderDirection;

    this.subscription.add(
      this.fetchDataForTable(this.sensor, {
          page: currentPage,
          limit: perPage,
          orderField,
          orderDirection,
        }
      ).subscribe(data => {
        this.sensorData = {
          data: data.items,
          total: data.total
        };

        this.totalItemCount = data.total;
      })
    )
  }

  handleSortChange(event: any): void {
    const currentPage = 0;
    const perPage = event.pageSize;

    this.subscription.add(
      this.fetchDataForTable(this.sensor, {
          page: currentPage,
          limit: perPage,
          orderField: event.active,
          orderDirection: event.direction
        }
      ).subscribe(data => {
        this.sensorData = {
          data: data.items,
          total: data.total
        };

        this.totalItemCount = data.total;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchSensorData(): Observable<GetPaginatedSensorData> {
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
      }),
      tap(data => {
        if (data) {
          this.room = data;
        }
      }),
      switchMap(_ => this.fetchDataForTable(this.sensor, {
        page: 0,
        limit: 5
      }))
    )
  }

  private fetchDataForTable(sensor: SensorDto, paginatedListInput: TablePaginatedListInput): Observable<GetPaginatedSensorData> {
    const {page, limit, orderField = 'createdAt', orderDirection = 'DESC', search} = paginatedListInput;

    return this.sensorHelperService.getPaginatedData(sensor.type, {
      page,
      limit,
      orderField,
      orderDirection,
      search,
    }).pipe(
      map(data => {
          return {
            items: data.items!,
            total: data.total,
          }
        }
      ),
    )
  }
}
