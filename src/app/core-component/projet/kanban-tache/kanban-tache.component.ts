import {Component, OnInit} from '@angular/core';
import {TacheService} from "../../../core/service/taches/tache.service";
import {StatutTache, Tache} from "../../../model/tache.model";
import {Board} from "../../../model/board";
import {Column} from "../../../model/column.model";
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-kanban-tache',
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    CdkDropListGroup,
    NgIf,
    DatePipe
  ],
  templateUrl: './kanban-tache.component.html',
  styleUrl: './kanban-tache.component.scss'
})
export class KanbanTacheComponent implements OnInit{
  taches : Tache[] =[] ;
   board!: Board;


  ngOnInit() {
    this.tacheService.getAllTaches().subscribe(data => {
      this.taches = data;

      this.board = new Board('KanBan Diagramme', [
        new Column('A_FAIRE', this.taches.filter(tache => tache.statut === StatutTache.A_FAIRE)),
        new Column('BLOQUEE', this.taches.filter(tache => tache.statut === StatutTache.BLOQUEE)),
        new Column('EN_COURS', this.taches.filter(tache => tache.statut === StatutTache.EN_COURS)),
        new Column('TERMINEE', this.taches.filter(tache => tache.statut === StatutTache.TERMINEE))
      ]);
    });
  }

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // Déplacement vers une autre colonne
      const movedTask = event.previousContainer.data[event.previousIndex];

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Trouver le nom de la colonne cible
      const targetColumn = this.board.columns.find(column => column.tasks === event.container.data);
      if (targetColumn) {
        // Mettre à jour le statut
        movedTask.statut = targetColumn.name as StatutTache;
        if (movedTask.id)
        // Appel API pour sauvegarder
        this.tacheService.updateTacheStatut(movedTask.id, movedTask.statut).subscribe({
          next: () => console.log(`Tâche ${movedTask.id} mise à jour vers ${movedTask.statut}`),
          error: err => console.error('Erreur de mise à jour du statut', err)
        });
      }
    }
  }
  constructor(private tacheService : TacheService) {
  }

}
