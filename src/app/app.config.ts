import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SensorsComponent } from "./components/sensors/sensors.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SecurityComponent } from "./components/security/security.component";
import { provideAnimations } from '@angular/platform-browser/animations';
import { LightingComponent } from "./components/lighting/lighting.component";
import { ClimateComponent } from "./components/climate/climate.component";
import { RoomsComponent } from "./components/rooms/rooms.component";
import { RoomDetailsComponent } from "./components/rooms/room-details/room-details.component";
import { AllNotificationsComponent } from "./components/notifications/all-notifications/all-notifications.component";
import { HttpClientModule } from "@angular/common/http";
import { SensorDetailsComponent } from "./components/sensors/sensor-details/sensor-details.component";
import { DatePipe } from "@angular/common";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sensors', component: SensorsComponent },
  { path: 'sensors/sensor-details/:id', component: SensorDetailsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'notifications/all', component: AllNotificationsComponent },
  { path: 'dashboard/security', component: SecurityComponent },
  { path: 'dashboard/lighting', component: LightingComponent },
  { path: 'dashboard/climate', component: ClimateComponent },
  { path: 'dashboard/rooms', component: RoomsComponent },
  { path: 'dashboard/room-details/:id', component: RoomDetailsComponent },
  { path: '**', redirectTo: 'dashboard' },
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule),
    DatePipe
  ],
}
