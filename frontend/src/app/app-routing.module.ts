import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-weapons',
    pathMatch: 'full'
  },
  {
    path: 'add-bicycle',
    loadChildren: () => import('./add-weapon/add-weapon.module').then( m => m.AddWeaponPageModule)
  },
  {
    path: 'list-weapons',
    loadChildren: () => import('./list-weapons/list-weapons.module').then( m => m.ListWeaponsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
