import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EntrepriseComponent} from "./entreprise.component";
import {AddEntrepriseComponent} from "./add-entreprise/add-entreprise.component";

const routes: Routes = [
  {
    path: '',
    component: EntrepriseComponent,
    children: [
      {
        path: 'addEntreprise',
        component: AddEntrepriseComponent,
      },
      {
        path: 'updateEntreprise',
        component: AddEntrepriseComponent,
      }, {
        path: 'dataisEntreprise',
        component: AddEntrepriseComponent,
      }, {
        path: 'listEntreprise',
        component: AddEntrepriseComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterpriseRoutingModule {}
