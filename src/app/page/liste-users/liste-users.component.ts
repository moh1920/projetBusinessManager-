import {Component, OnInit} from '@angular/core';
import {Users} from "../../models/users";
import {UserServiceService} from "../../services/user-service.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-liste-users',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './liste-users.component.html',
  styleUrl: './liste-users.component.scss'
})
export class ListeUsersComponent implements  OnInit{
  users: Users[] = [];

  constructor(private userService: UserServiceService) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe({
      next: data => this.users = data,
      error: err => console.error('Erreur récupération users', err)
    });
  }
}
