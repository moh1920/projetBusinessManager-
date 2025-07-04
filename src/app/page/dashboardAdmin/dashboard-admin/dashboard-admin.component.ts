import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-admin.component.html',
  styleUrl: './dashboard-admin.component.scss'
})
export class DashboardAdminComponent {

  constructor(private router : Router) {
  }

  addUser(s: string) {
    this.router.navigate(['/usersAdd'])
  }
  listUser(s: string) {
    this.router.navigate([s])
  }
}
