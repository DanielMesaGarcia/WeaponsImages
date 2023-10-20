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
  isUpdateMode: boolean = false;
  selectedWeaponId: any;
  constructor(private weaponService: WeaponService, private router: Router, private photoService: PhotoService) { }

  ngOnInit() {
    this.weaponService.getWeapons().subscribe((data: any) => {
      this.weapons = data;
    });
  }

  deleteWeapon(id: any) {
    this.weaponService.deleteWeapon(id).subscribe(
      (response: any) => {
        // Handle success response, maybe update the weapons list in the frontend.
        console.log(response.message); // Log the response message
        // Update the weapons list in the frontend
        this.weapons = this.weapons.filter((weapon) => weapon.id !== id);
      },
      (error: any) => {
        // Handle error response
        console.error(error); // Log the error message
      }
    );
  }

  updateWeapon(id: any) {
    this.isUpdateMode = true;
    this.selectedWeaponId = id;
    this.weaponService.getWeaponById(id).subscribe((data: any) => {
      this.formData.type = data.type;
      this.formData.element = data.element;
      this.formData.monster = data.monster;
      this.capturedPhoto = 'http://localhost:8080/images/' + data.filename; // Asegúrate de que "image" sea la propiedad correcta que contiene el nombre de la imagen
      console.log(this.formData);
    });
  }
  

  ionViewDidEnter() {
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

  addWeapon() {
    this.router.navigateByUrl("/add-weapon");
  }
  async onSubmit() {
    //update
    if (this.isUpdateMode) {
      let blob = null;
      const response = await fetch(this.capturedPhoto);
      blob = await response.blob();
      console.log("formdata", this.formData);
      this.weaponService.updateWeapon(this.selectedWeaponId, this.formData, blob).subscribe(
        (data) => {
          console.log("Weapon updated successfully", data);
          this.getAllWeapons();
          this.isUpdateMode = false;
          this.capturedPhoto = "";
        },
        (error) => {
          console.error("Error updating weapon", error);
        }
      );
    } else {
      //post
      if (this.formData.type && this.formData.element && this.formData.monster && this.capturedPhoto) {
        let blob = null;
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();

        this.weaponService.createWeapon(this.formData, blob).subscribe(
          (data) => {
            console.log("Weapon added successfully", data);
            this.getAllWeapons();
          },
          (error) => {
            console.error("Error adding weapon", error);
          }
        );
      } else {
        console.error("Please fill all the required fields and add an image.");
      }
    }
  }
}
