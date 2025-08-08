import {Component, OnInit} from '@angular/core';
import {DocumentService} from "../../../core/service/document/document.service";
import {MatTooltip} from "@angular/material/tooltip";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Document} from "../../../model/Document.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-document',
  standalone: true,
  imports: [
    MatTooltip,
    NgIf,
    DatePipe,
    NgForOf
  ],
  templateUrl: './list-document.component.html',
  styleUrl: './list-document.component.scss'
})
export class ListDocumentComponent implements OnInit{

  documentList : Document[] = [] ;

  constructor(private documentService : DocumentService,private router : Router) {
  }
  ngOnInit() {
   this.documentService.getAllDocuments().subscribe(data =>{
     this.documentList = data ;
   })
   }


  addDocument() {
    this.router.navigate(['/documentation/addDocument'])
  }

  viewDocument(id:any) {
    this.router.navigate(['/documentation/detaisDocument',id])

  }

  deleteDocument(id:any) {
    this.documentService.deleteDocument(id).subscribe({
      next: () => {
        console.log('Document supprimé avec succès');
        this.documentService.getAllDocuments().subscribe(data =>{
          this.documentList = data ;
        });
      },
      error: err => {
        console.error('Erreur lors de la suppression', err);
      }
    });
  }


}
