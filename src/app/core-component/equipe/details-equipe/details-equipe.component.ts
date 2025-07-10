import {Component, OnInit} from '@angular/core';
import {EquipeService} from "../../../core/service/equipe/equipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EquipeDto} from "../../../model/equipeDto.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-details-equipe',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './details-equipe.component.html',
  styleUrl: './details-equipe.component.scss'
})
export class DetailsEquipeComponent implements OnInit{
  equipedetails !: EquipeDto ;
  idEquipe !:  number ;
constructor(private equipeService : EquipeService,private routerAvtivated : ActivatedRoute,private router : Router) {
}
ngOnInit() {
  this.idEquipe = this.routerAvtivated.snapshot.params['id'];
  this.equipeService.getEquipeById(this.idEquipe).subscribe(data =>{
    this.equipedetails = data ;
  })
}


  onSubmit() {
  this.equipeService.updateEquipe(this.idEquipe,this.equipedetails).subscribe(()=>{
    console.log("le update est succes");
    this.router.navigate(['/equipe/listEquipe']);
  })
  }
}
