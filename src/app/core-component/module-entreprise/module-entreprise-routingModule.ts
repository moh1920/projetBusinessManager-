import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ModuleEntrepriseComponent} from "./module-entreprise.component";

const routes: Routes = [
  {
    path: '',
    component: ModuleEntrepriseComponent,
    children: [
      {
        path: 'managementEntreprise',
        loadChildren: () =>
          import('./entreprise/entreprise.module').then((m) => m.EntrepriseModule),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleEntrepriseRoutingModule {}
