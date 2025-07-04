import { Routes } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {DashboardAdminComponent} from "./page/dashboardAdmin/dashboard-admin/dashboard-admin.component";
import {RegisterUsersComponentComponent} from "./page/register-users-component/register-users-component.component";
import {ListeUsersComponent} from "./page/liste-users/liste-users.component";

export const routes: Routes = [
  { path: '', redirectTo: 'dashboardAdmin', pathMatch: 'full' },
  { path: 'test', component: TestComponent },
  { path: 'dashboardAdmin', component: DashboardAdminComponent },
  { path: 'usersAdd', component: RegisterUsersComponentComponent },
  { path: 'listUsers', component: ListeUsersComponent }
];
