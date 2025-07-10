import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import {ModuleEntrepriseComponent} from "./module-entreprise.component";
import {ModuleEntrepriseRoutingModule} from "./module-entreprise-routingModule";
import {sharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    ModuleEntrepriseComponent
  ],
  imports: [CommonModule, ModuleEntrepriseRoutingModule, RouterModule,sharedModule],
  providers: [],
})
export class ModuleEntrepriseModule {}
