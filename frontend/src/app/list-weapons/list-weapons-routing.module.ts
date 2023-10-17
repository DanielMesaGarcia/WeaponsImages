import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWeaponsPage } from './list-weapons.page';

const routes: Routes = [
  {
    path: '',
    component: ListWeaponsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWeaponsPageRoutingModule {}
