import {Component, OnInit} from '@angular/core';
import {EquipeDto} from "../../../model/equipeDto.model";
import {EquipeService} from "../../../core/service/equipe/equipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MembreDto} from "../../../model/membreDto.model";
import {MembreService} from "../../../core/service/membre/membre.service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-details-membre',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    sharedModule
  ],
  templateUrl: './details-membre.component.html',
  styleUrl: './details-membre.component.scss'
})
export class DetailsMembreComponent implements OnInit{
  membredetails !: MembreDto ;
  idMembre !:  number ;
  equipeMembre !: EquipeDto ;
  constructor(private equipeService : EquipeService,
              private routerAvtivated : ActivatedRoute,
              private router : Router,
              private membreService : MembreService) {
  }
  ngOnInit() {
    this.idMembre = this.routerAvtivated.snapshot.params['id'];
    this.membreService.getMembreById(this.idMembre).subscribe(data =>{
      this.membredetails = data ;
      this.getEquipeMembre(data.equipeId);
    })
  }


  getEquipeMembre(id : number){
    this.equipeService.getEquipeById(id).subscribe(data =>{
      this.equipeMembre =data ;
    })
  }

  onSubmit() {
    this.membreService.updateMembre(this.membredetails).subscribe(()=>{
      console.log("le update est succes");
      this.router.navigate(['/equipe/listMembre']);
    })
    this.router.navigate(['/equipe/listMembre']);

  }
}
