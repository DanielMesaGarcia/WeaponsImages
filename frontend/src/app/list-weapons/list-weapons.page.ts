import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeaponService } from '../services/weapon.service';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-list-weapons',
  templateUrl: './list-weapons.page.html',
  styleUrls: ['./list-weapons.page.scss'],
})
export class ListWeaponsPage implements OnInit {
  capturedPhoto: string = "";
  weapons: any = [];

  constructor(private weaponService: WeaponService, private router: Router, private photoService: PhotoService) { }

  ngOnInit() { }

  ionViewDidEnter(){
    this.getAllWeapons();
  }

  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = null;
  }

  
  

  formData = {
    type: '',
    element: '',
    monster: '',
    filename: ''
  };

  getAllWeapons() {
    this.weaponService.getWeapons().subscribe(weap => {
      console.log(weap);
      this.weapons = weap;
    })
  }

  addWeapon(){
   this.router.navigateByUrl("/add-weapon");
  }
  async onSubmit() {
    if (this.formData.type && this.formData.element && this.formData.monster && this.capturedPhoto) {
      let blob = null;
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
  
      this.weaponService.createWeapon(this.formData, blob).subscribe(
        (data) => {
          // Maneja la respuesta si es necesario
          console.log("Weapon added successfully", data);
          // Aquí podrías hacer algo como actualizar la lista de armas después de agregar una nueva
          this.getAllWeapons();
        },
        (error) => {
          // Maneja el error si es necesario
          console.error("Error adding weapon", error);
        }
      );
    } else {
      console.error("Please fill all the required fields and add an image.");
    }
  }
  
  
}
