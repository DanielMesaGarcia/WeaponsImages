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

  getWeaponPhoto(id: any) {
    return this.httpClient.get(`${this.endPoint}/${id}/photo`);
  }
  

  createWeapon(weapon, blob) {
    let formData = new FormData();
    formData.append("type", weapon.type);
    formData.append("element", weapon.element);
    formData.append("monster", weapon.monster);
    formData.append("file", blob);
  
    return this.httpClient.post(this.endPoint, formData);
  }

  getWeaponById(id: any) {
    return this.httpClient.get(`${this.endPoint}/${id}`);
  }

  deleteWeapon(id: any) {
    return this.httpClient.delete(`${this.endPoint}/${id}`);
  }

  updateWeapon(id: any, weapon: any, blob: any) {
    let formData = new FormData();
    formData.append("type", weapon.type);
    formData.append("element", weapon.element);
    formData.append("monster", weapon.monster);
    formData.append("file", blob);
  
    return this.httpClient.put(`${this.endPoint}/${id}`, formData);
  }
}
