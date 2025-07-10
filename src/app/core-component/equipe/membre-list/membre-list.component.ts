import {Component, OnInit} from '@angular/core';
import {Equipe} from "../../../model/equipe.model";
import {EquipeService} from "../../../core/service/equipe/equipe.service";
import {Membre} from "../../../model/membre.model";
import {MembreService} from "../../../core/service/membre/membre.service";
import {MatTooltip} from "@angular/material/tooltip";
import {NgForOf} from "@angular/common";
import {routes} from "../../../core/helpers/routes";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-membre-list',
  standalone: true,
  imports: [
    MatTooltip,
    NgForOf,
    RouterLink
  ],
  templateUrl: './membre-list.component.html',
  styleUrl: './membre-list.component.scss'
})
export class MembreListComponent implements OnInit{
  membres: Membre[] = [];

  constructor(private membreService: MembreService,
              private router : Router) {}

  ngOnInit(): void {
    this.membreService.getAllMembre().subscribe(data => {
      this.membres = data;
    });
  }

  addMembre() {
    this.router.navigate(['/equipe/addMembre'])
  }

  viewMembre(id: any) {
    this.router.navigate(['/equipe/detailsMembre',id])

  }

  deleteMembre(id: any) {
    return id ;
  }

  protected readonly routes = routes;
}
