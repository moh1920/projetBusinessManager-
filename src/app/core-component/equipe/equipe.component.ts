import {Component, OnInit} from '@angular/core';
import {Equipe} from "../../model/equipe.model";
import {EquipeService} from "../../core/service/equipe/equipe.service";
import {MatTooltip} from "@angular/material/tooltip";
import {DatePipe, NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-equipe',
  standalone: true,
  imports: [
    MatTooltip,
    DatePipe,
    NgForOf
  ],
  templateUrl: './equipe.component.html',
  styleUrl: './equipe.component.scss'
})
export class EquipeComponent implements OnInit{
  equipes: Equipe[] = [];

  constructor(private equipeService: EquipeService,private  router :Router) {}

  ngOnInit(): void {
    this.equipeService.getAllEquipes().subscribe(data => {
      this.equipes = data;
    });
  }

  addEquipe() {
    this.router.navigate(['/equipe/addEquipe'])
  }

  viewEquipe(id : any) {
         this.router.navigate(['/equipe/detailsEquipe',id])
  }

  deleteEquipe(id: any) {
    return id ;
  }

  affecterMembre(id: number | undefined) {
    this.router.navigate(['/equipe/affectedMembreToEquipe',id])
  }
}
