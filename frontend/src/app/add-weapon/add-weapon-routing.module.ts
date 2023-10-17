import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddWeaponPage } from './add-weapon.page';

const routes: Routes = [
  {
    path: '',
    component: AddWeaponPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddWeaponPageRoutingModule {}
