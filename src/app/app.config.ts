import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SecurityComponent } from "./components/security/security.component";
import { provideAnimations } from '@angular/platform-browser/animations';
import { LightingComponent } from "./components/lighting/lighting.component";
import { ClimateComponent } from "./components/climate/climate.component";
import { RoomsComponent } from "./components/rooms/rooms.component";
import { RoomDetailsComponent } from "./components/rooms/room-details/room-details.component";
import { AllNotificationsComponent } from "./components/notifications/all-notifications/all-notifications.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'notifications/all', component: AllNotificationsComponent },
  { path: 'security', component: SecurityComponent },
  { path: 'lighting', component: LightingComponent },
  { path: 'climate', component: ClimateComponent },
  { path: 'rooms', component: RoomsComponent },
  { path: 'room-details/:id', component: RoomDetailsComponent },
  { path: '**', redirectTo: 'dashboard' },
]

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
}
