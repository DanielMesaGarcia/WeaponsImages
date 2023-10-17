import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  endPoint = "http://localhost:8080/api/weapons";

  constructor(private httpClient: HttpClient) { }

  getWeapons(){
    return this.httpClient.get(this.endPoint);
  }

  // DECOMMENT:
  createWeapon(weapon, blob){
    let formData = new FormData();
    formData.append("type", weapon.brand);
    formData.append("element", weapon.model);
    formData.append("monster", weapon.model);
    formData.append("file", blob);

    return this.httpClient.post(this.endPoint, formData);
  }
}
