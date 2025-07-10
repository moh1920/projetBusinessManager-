import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjetService} from "../../../core/service/projet/projet.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Projet} from "../../../model/projet.model";
import {routes} from "../../../core/helpers/routes";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PrioriteDeTache, StatutTache, Tache} from "../../../model/tache.model";
import {CategorieTache} from "../../../model/categorieTache.model";
import {TacheService} from "../../../core/service/taches/tache.service";
import {CategorieTacheService} from "../../../core/service/categorieTache/categorie-tache.service";


@Component({
  selector: 'app-detais-projet',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    DatePipe,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './detais-projet.component.html',
  styleUrl: './detais-projet.component.scss'
})
export class DetaisProjetComponent implements OnInit{



  idProjet !: number ;
  projetDetais !: Projet ;


  tacheForm !: FormGroup;
  priorites = Object.values(PrioriteDeTache);
  statuts = Object.values(StatutTache);

  categorieTache : CategorieTache[] = [] ;

  constructor(private fb: FormBuilder,private projetService : ProjetService,
              private activateRouter : ActivatedRoute,
              private tacheService: TacheService,
              private categorieTacheService : CategorieTacheService,
              private router :Router) {
  }
  ngOnInit() {
    this.idProjet = this.activateRouter.snapshot.params['id'];
    this.projetService.getProjetById(this.idProjet).subscribe(data =>{
      this.projetDetais = data ;

    })


    this.categorieTacheService.getAllCategories().subscribe(data => {
      this.categorieTache = data ;
    })

    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      statut: [StatutTache.A_FAIRE, Validators.required],
      priorite: [PrioriteDeTache.MOYENNE, Validators.required],
      idCategorieTache : ['',Validators.required]

    });
  }


  onSubmit() {
    if (this.tacheForm.valid) {
      const tache: Tache = this.tacheForm.value;
      this.tacheService.addTache(tache, this.tacheForm.value.idCategorieTache, this.idProjet).subscribe({
        next: (res) => {
          console.log('Tâche ajoutée avec succès', res);
          this.projetService.getProjetById(this.idProjet).subscribe(data =>{
            this.projetDetais = data ;
          })


        },
        error: (err) => console.error('Erreur lors de l’ajout de la tâche', err)
      });
    }
  }

  protected readonly routes = routes;

  getTachesParStatut(status: string): Tache[] {
    return this.projetDetais.taches?.filter(tache =>
      tache.statut.includes(status)
    ) || [];
  }

}
