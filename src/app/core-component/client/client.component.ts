import { Component } from '@angular/core';
import {ClientService} from "../../core/service/client/client.service";
import {Router} from "@angular/router";
import {Client} from "../../model/client.model";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    MatTooltip,
    NgForOf
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  clientList : Client[] = [] ;
  constructor(private Clientservise: ClientService,private router : Router) {
  }
  ngOnInit() {
    this.Clientservise.getAllClients().subscribe(data => {
      this.clientList = data ;
      console.log(this.clientList);
    })
  }


  addClient() {
    this.router.navigate(['/client/addClient'])

  }

  viewClient(id: number | undefined) {
    return id ;
  }

  deleteClient(id: number | undefined) {
    return id ;
  }
}
