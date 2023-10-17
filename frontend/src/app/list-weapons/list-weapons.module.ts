import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListWeaponsPageRoutingModule } from './list-weapons-routing.module';

import { ListWeaponsPage } from './list-weapons.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListWeaponsPageRoutingModule
  ],
  declarations: [ListWeaponsPage]
})
export class ListWeaponsPageModule {}
