import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf, NgForOf, DatePipe} from '@angular/common';

import {TacheService} from "../../../core/service/taches/tache.service";
import {CategorieTacheService} from "../../../core/service/categorieTache/categorie-tache.service";

import {Tache, StatutTache, PrioriteDeTache} from "../../../model/tache.model";
import {CategorieTache} from "../../../model/categorieTache.model";
import {routes} from "../../../core/helpers/routes";
import {SousTacheService} from "../../../core/service/sousTache/sous-tache.service";
import {SousTache} from "../../../model/sousTache.model";

@Component({
  selector: 'app-detais-tache',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './detais-tache.component.html',
  styleUrl: './detais-tache.component.scss'
})
export class DetaisTacheComponent implements OnInit {

  idTache!: number;
  tacheDetails!: Tache;

  sousTacheForm!: FormGroup;
  priorites = Object.values(PrioriteDeTache);
  statuts = Object.values(StatutTache);

  categorieTache: CategorieTache[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tacheService: TacheService,
    private categorieTacheService: CategorieTacheService,
    private sousTacheService : SousTacheService
  ) {}

  ngOnInit(): void {
    this.idTache = this.route.snapshot.params['id'];

    this.categorieTacheService.getAllCategories().subscribe(data => {
      this.categorieTache = data;
    });

    this.tacheService.getTacheById(this.idTache).subscribe(data => {
      this.tacheDetails = data;


      this.sousTacheForm = this.fb.group({
        titre: ['', Validators.required],
        description: [''],
        type: ['', Validators.required],
        dateDebut: [''],
        dateFin: [''],
        progres: [0, ],
        duree: [0, Validators.required],
      });
    });
  }

  onSubmit(): void {
        if (this.sousTacheForm.valid){
          this.sousTacheService.createWithTache(this.sousTacheForm.value,this.idTache).subscribe(()=>{
            console.log("add with succes");
            this.tacheService.getTacheById(this.idTache).subscribe(data => {
              this.tacheDetails = data;});

          })
        }
  }
  protected readonly routes = routes;

  getTachesParType(type: string): SousTache[] {
    return this.tacheDetails.sousTaches?.filter(tache =>
      tache.type?.includes(type)
    ) || [];
  }

}
