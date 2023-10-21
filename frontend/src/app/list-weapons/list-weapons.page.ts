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

  private validateInputs(): boolean {
    // Expresiones regulares para validar los campos
    const typeRegex = /^[a-zA-Z\s]+$/;
    const elementRegex = /^[a-zA-Z]+$/;
    const monsterRegex = /^[a-zA-Z\s\-?'']+$/;

    // Verificar si los campos cumplen con las expresiones regulares
    const isTypeValid = typeRegex.test(this.formData.type);
    const isElementValid = elementRegex.test(this.formData.element);
    const isMonsterValid = monsterRegex.test(this.formData.monster);
    let isPictureValid = false;
    if (typeof this.capturedPhoto !== 'undefined' && this.capturedPhoto !== null) {
      isPictureValid = true;
    }

    // Devolver true si todos los campos son válidos, de lo contrario, false
    return isTypeValid && isElementValid && isMonsterValid && isPictureValid;
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
    const upd = document.getElementById('upd');
    upd.classList.add('show');
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
    const upd = document.getElementById('upd');
    upd.classList.remove('show');
    this.isUpdateMode=false;
  }

  addWeapon() {
    this.router.navigateByUrl("/add-weapon");
  }
  async onSubmit() {
    // JavaScript
    const typeRegex = /^[a-zA-Z\s]+$/;
    const elementRegex = /^[a-zA-Z]+$/;
    const monsterRegex = /^[a-zA-Z\s\-?'']+$/;

    // Verificar si los campos cumplen con las expresiones regulares
    const isTypeValid = typeRegex.test(this.formData.type);
    const typeError = document.getElementById('typeError');
    const isElementValid = elementRegex.test(this.formData.element);
    const elementError = document.getElementById('elementError');
    const isMonsterValid = monsterRegex.test(this.formData.monster);
    const monsterError = document.getElementById('monsterError');
    const pictureError = document.getElementById('pictureError');
    monsterError.classList.remove('show');
    typeError.classList.remove('show');
    elementError.classList.remove('show');
    pictureError.classList.remove('show');
    if (this.validateInputs()) {
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
        const upd = document.getElementById('upd');
    upd.classList.remove('show');
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
      this.formData.type = '';
      this.formData.element = '';
      this.formData.monster = '';
      this.capturedPhoto = null;
    } else {

      if (!isTypeValid) {
        console.log("TEST TEST")
        typeError.classList.add('show');
      }


      if (!isElementValid) {
        elementError.classList.add('show');
      }


      if (!isMonsterValid) {
        monsterError.classList.add('show');
      }


      if (this.capturedPhoto === 'undefined' || this.capturedPhoto === '' || this.capturedPhoto === null) {
        pictureError.classList.add('show');
      }

    }
    
  }
}
