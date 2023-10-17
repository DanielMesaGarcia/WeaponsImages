import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WeaponService } from '../services/weapon.service';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-add-weapon',
  templateUrl: './add-weapon.page.html',
  styleUrls: ['./add-weapon.page.scss'],
})
export class AddWeaponPage implements OnInit {

  weaponForm: FormGroup;
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(public formBuilder: FormBuilder,
    private weaponService: WeaponService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.weaponForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  ngOnInit() {
    this.weaponForm = this.formBuilder.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]]
    })
  }

  get errorControl() {
    return this.weaponForm.controls;
  }

  takePhoto() {
    // DECOMMENT:
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  pickImage() {
    // DECOMMENT:
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    // DECOMMENT:
    this.capturedPhoto = null;
  }

  async submitForm() {
    // DECOMMENT:
    this.isSubmitted = true;
    if (!this.weaponForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      let blob = null;
      if (this.capturedPhoto != "") {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      this.weaponService.createWeapon(this.weaponForm.value, blob).subscribe(data => {
        console.log("Photo sent!");
        this.router.navigateByUrl("/list-weapons");
      })
    }
  }
}
