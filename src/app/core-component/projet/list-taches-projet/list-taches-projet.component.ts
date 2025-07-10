import {Component, OnInit} from '@angular/core';
import {TacheService} from "../../../core/service/taches/tache.service";
import {ProjetService} from "../../../core/service/projet/projet.service";
import {Projet} from "../../../model/projet.model";
import {Tache} from "../../../model/tache.model";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {sharedModule} from "../../../shared/shared.module";
import {MembreService} from "../../../core/service/membre/membre.service";
import {Membre} from "../../../model/membre.model";

@Component({
  selector: 'app-list-taches-projet',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgClass,
    MatTooltip,
    ReactiveFormsModule,
    sharedModule
  ],
  templateUrl: './list-taches-projet.component.html',
  styleUrl: './list-taches-projet.component.scss'
})
export class ListTachesProjetComponent implements OnInit{
  projetList : Projet[] = [] ;
  assignTacheForm !: FormGroup ;
  constructor(private tacheServce : TacheService,private projetService : ProjetService,
              private router : Router,
              private membreService : MembreService,
              private fb : FormBuilder
  ) {
  }
  ngOnInit() {
    this.assignTacheForm = this.fb.group({
      membreId: ['']
    });


    this.projetService.getAllProjets().subscribe(data=>{
      this.projetList = data ;
    })
  }
  getTacheByIdProjet(id : number): Tache[]{
    let  tachelist : Tache[] = [] ;
    this.tacheServce.getAllTachesByProjet(id).subscribe(data =>{
      tachelist = data ;
    })
    return  tachelist ;
  }

  addTacheProjet(id : number | undefined) {
     this.router.navigate(['projet/addTache',id])
  }

  detaisTache(id: number | undefined) {
    this.router.navigate(['projet/detaisTache',id])
  }

  assignerMembre(id: number | undefined) {

  }

  tacheId !: number ;

  recupereTacheId(id: number | undefined) {
    this.getAllMembre() ;
    if (id)
    this.tacheId = id ;
  }

  membres : Membre[] = []
  getAllMembre(){
    this.membreService.getAllMembre().subscribe(data => {
      this.membres = data ;
    })
  }
  onSubmitAssignTache() {
     if (this.assignTacheForm.valid){
       this.tacheServce.assignerTacheAMembre(this.tacheId,this.assignTacheForm.value.membreId).subscribe(()=>{
         console.log("assigne le Membre");
         this.projetService.getAllProjets().subscribe(data=>{
           this.projetList = data ;
         })
       })
     }
  }


}
