import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {KeycloakService} from "./services/util/keycloak/keycloak.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
  export class AppComponent implements OnInit{
  title = 'BuissnesManagmetUI';
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  ngOnInit(): void {
    const roles = this.keycloakService.roles;
    console.log("Roles utilisateur:", roles);

    if (roles.includes('ADMIN')) {
      this.router.navigate(['/dashboardAdmin']);
    } else if (roles.includes('CLIENT')) {
      this.router.navigate(['/dashboardClient']);
    }
  }




}
