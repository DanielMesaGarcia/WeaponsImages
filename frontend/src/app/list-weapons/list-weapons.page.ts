import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeaponService } from '../services/weapon.service';

@Component({
  selector: 'app-list-weapons',
  templateUrl: './list-weapons.page.html',
  styleUrls: ['./list-weapons.page.scss'],
})
export class ListWeaponsPage implements OnInit {

  weapons: any = [];

  constructor(private weaponService: WeaponService, private router: Router) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.getAllWeapons();
  }

  getAllWeapons() {
    this.weaponService.getWeapons().subscribe(weap => {
      console.log(weap);
      this.weapons = weap;
    })
  }

  addWeapon(){
   this.router.navigateByUrl("/add-weapon");
  }
}
