import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SettingsComponent } from "./components/settings/settings.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'test', component: SettingsComponent },
  { path: '**', redirectTo: 'dashboard' },
]

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
}
