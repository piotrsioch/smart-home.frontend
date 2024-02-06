import { Component, OnDestroy } from '@angular/core';
import { RoomService } from "../../core/api/services/room.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { RoomDto } from "../../core/api/models/room-dto";
import { LoaderComponent } from "../../shared/components/loader/loader.component";
import { CommonModule } from "@angular/common";
import { ModalService } from "../../shared/services/modal.service";
import {
  AddRoomModalComponent,
  AddRoomModalReturnData,
} from "./add-room-modal/add-room-modal.component";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { roomTypeIconMap } from "./rooms.assets";

@Component({
  selector: 'sh-rooms',
  standalone: true,
  imports: [
    LoaderComponent,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnDestroy {
  public loading = true;
  public rooms: RoomDto[] = [];
  public roomIconMap = roomTypeIconMap;
  private subscription = new Subscription();
  private loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly roomService: RoomService,
    private readonly modalService: ModalService,
    private readonly router: Router,
  ) {
    this.subscription.add(
      this.loadingSubject.subscribe(isLoading => {
        this.loading = isLoading;
      })
    );

    this.subscription.add(
      this.fetchRoomData().subscribe(data => {
        this.rooms = data;
        this.loadingSubject.next(false);
      })
    )
  }

  public openRoomDetails(id: string): void {
    this.router.navigate(['dashboard/room-details', id]);
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
        }),
        switchMap(_ => this.fetchRoomData())
      ).subscribe(data => {
        this.loadingSubject.next(false);
        this.rooms = data;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchRoomData(): Observable<RoomDto[]> {
    return this.roomService.roomControllerRoomList({
      page: 0,
      limit: 0,
    }).pipe(
      tap(_ => this.loadingSubject.next(true)),
      map(data => data.items!),
    )
  }
}
