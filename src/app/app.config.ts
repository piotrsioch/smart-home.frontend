import { ApplicationConfig } from "@angular/core";
import { provideRouter, Routes } from "@angular/router";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { SettingsComponent } from "./modules/settings/settings.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'test', component: SettingsComponent }
]

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
}
