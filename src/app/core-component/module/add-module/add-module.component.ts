import {Component, OnInit} from '@angular/core';
import {ModuleService} from "../../../core/service/Module/module.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {Validators} from "ngx-editor";
import {PaginatorModule} from "primeng/paginator";
import {routes} from "../../../core/helpers/routes";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-add-module',
  standalone: true,
  imports: [
    PaginatorModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './add-module.component.html',
  styleUrl: './add-module.component.scss'
})
export class AddModuleComponent implements OnInit{

  moduleForm!: FormGroup;
  constructor(private moduleTittleService : ModuleService ,private  fb: FormBuilder ) {

  }

  ngOnInit(): void {
    this.moduleForm = this.fb.group({
      title: ['', Validators.required],
      status: [false],
    });
  }

  createModule(){
    if (this.moduleForm.valid){
      this.moduleTittleService.addModule(this.moduleForm.value).subscribe(data =>{
        console.log('ajout avec succes', data);
      })
    }
  }

  protected readonly routes = routes;
}
