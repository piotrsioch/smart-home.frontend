import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { SecurityComponent } from "./components/security/security.component";
import { provideAnimations } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'security', component: SecurityComponent },
  { path: '**', redirectTo: 'dashboard' },
]

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations()],
}
