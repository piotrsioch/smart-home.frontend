import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationDto } from "../../../core/api/models/notification-dto";
import { SensorDto } from "../../../core/api/models/sensor-dto";
import { DatePipe } from "@angular/common";

@Component({
  selector: 'sh-notification-card',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss'
})
export class NotificationCardComponent {
  @Input({ required: true }) notification: NotificationDto;
  @Input({ required: true }) sensor: SensorDto;
  @Input() buttonText = 'Mark as read';

  @Output() buttonClicked = new EventEmitter<string>();

  public handleButtonClicked(id: string): void {
    this.buttonClicked.emit(id);
  }
}
