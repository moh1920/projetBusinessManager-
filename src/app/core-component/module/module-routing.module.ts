import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModuleComponent} from "./module.component";
import {AddModuleComponent} from "./add-module/add-module.component";
import {AddModuleTittleComponent} from "./add-module-tittle/add-module-tittle.component";
import {ListModuleAffecterComponent} from "./list-module-affecter/list-module-affecter.component";

const routes: Routes = [
  { path: '', redirectTo: 'listModule', pathMatch: 'full' },
  {
    path: 'listModule',
    component: ModuleComponent
  },  {
    path: 'addModule',
    component: AddModuleComponent
  },{
    path: 'addModuleTittle',
    component: AddModuleTittleComponent
  },
{
    path: 'listModuleForAffecter/:id',
    component: ListModuleAffecterComponent
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
