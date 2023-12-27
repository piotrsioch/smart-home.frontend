import { Component } from '@angular/core';
import { RoomService } from "../../core/api/services/room.service";
import { SensorsService } from "../../core/api/services/sensors.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { filter, map, tap } from "rxjs/operators";
import { RoomDto } from "../../core/api/models/room-dto";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { ModalService } from "../../shared/services/modal.service";
import { AddRoomModalComponent, AlarmModalReturnData } from "./add-room-modal/add-room-modal.component";

@Component({
  selector: 'sh-rooms',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent {
  public loading = true;
  public rooms: RoomDto[] = [];
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly roomService: RoomService,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
      this.roomService.roomControllerRoomList({
        page: 0,
        limit: 0,
      }).pipe(
        tap(_ => this.loadingSubject.next(true)),
        map(data => data.items!),
      ).subscribe(data => {
        this.rooms = data;
        console.log(this.rooms);
        this.loadingSubject.next(false);
      })
    )
  }

  public addRoom(): void {
    const modalRef = this.modalService.open<AddRoomModalComponent, any, AlarmModalReturnData>(AddRoomModalComponent);

    this.subscription.add(
      modalRef.afterClosed().pipe(
        tap(_ => this.loadingSubject.next(true)),
        filter(data => !!data),
      ).subscribe(data => {
        this.loadingSubject.next(false);
      })
    )
  }
}
