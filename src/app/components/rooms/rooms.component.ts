import { Component, OnDestroy } from '@angular/core';
import { RoomService } from "../../core/api/services/room.service";
import { SensorsService } from "../../core/api/services/sensors.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { RoomDto } from "../../core/api/models/room-dto";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { ModalService } from "../../shared/services/modal.service";
import {
  AddRoomModalComponent,
  AddRoomModalReturnData,
} from "./add-room-modal/add-room-modal.component";
import { ActivatedRoute, Router } from "@angular/router";

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
export class RoomsComponent implements OnDestroy {
  public loading = true;
  public rooms: RoomDto[] = [];
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly roomService: RoomService,
    private readonly sensorsService: SensorsService,
    private readonly modalService: ModalService,
    private readonly router: Router,
    private route: ActivatedRoute,
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
        this.loadingSubject.next(false);
      })
    )
  }

  public openRoomDetails(id: string): void {
    this.router.navigate(['/room-details', id]);
  }

  public addRoom(): void {
    const modalRef = this.modalService.open<AddRoomModalComponent, any, AddRoomModalReturnData>(AddRoomModalComponent);

    this.subscription.add(
      modalRef.afterClosed().pipe(
        filter(data => !!data),
        tap(_ => this.loadingSubject.next(true)),
        switchMap(data => {
          return this.roomService.roomControllerCreateRoom({
            body: {
              name: data?.name!,
              roomType: data?.roomType!,
              description: data?.description || '',
            }
          })
        })
      ).subscribe(data => {
        this.loadingSubject.next(false);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
