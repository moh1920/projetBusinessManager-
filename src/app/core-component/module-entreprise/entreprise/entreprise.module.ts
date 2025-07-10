import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddEntrepriseComponent} from "./add-entreprise/add-entreprise.component";
import {DetaisEntrepriseComponent} from "./detais-entreprise/detais-entreprise.component";
import {ListEntrepriseComponent} from "./list-entreprise/list-entreprise.component";
import {UpdateEntrepriseComponent} from "./update-entreprise/update-entreprise.component";
import {EnterpriseRoutingModule} from "./enterprise-routing.module";
import {CoreComponentModule} from "../../core-component.module";




@NgModule({
  declarations: [
    AddEntrepriseComponent,
    DetaisEntrepriseComponent,
    ListEntrepriseComponent,
    UpdateEntrepriseComponent,
  ],
  imports: [
    CommonModule,
    EnterpriseRoutingModule,
    CoreComponentModule,

  ]
})
export class EntrepriseModule { }
