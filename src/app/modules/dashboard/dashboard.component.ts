import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../core/api/services/api.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'sh-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private readonly apiService: ApiService, private readonly httpClient: HttpClient) {
    this.httpClient.get('http://localhost:4001/alarm/list?page=0&limit=5').subscribe(data => console.log(data))
  }

  ngOnInit(): void {
    this.apiService.alarmControllerChangeLightState({
      body: {
        sensorId: 'L_001',
        state: "on",
      }
    }).subscribe(data => console.log(data))
  }

}
