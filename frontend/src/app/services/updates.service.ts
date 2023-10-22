import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UpdatesService {

  endPoint = "http://localhost:8080/api/upgrades";

  constructor(private httpClient: HttpClient) { }

  getUpgrades(weaponId: any) {
    console.log(this.httpClient.get(`${this.endPoint}?weaponId=${weaponId}`));
    return this.httpClient.get(`${this.endPoint}?weaponId=${weaponId}`);
  }

  createUpgrades(upgrade: any): Observable<any> {
    return this.httpClient.post(this.endPoint, upgrade);
  }
  

  updateUpgrades(upgrade: any): Observable<any> {
    const url = `${this.endPoint}/${upgrade.id}`;
    return this.httpClient.put(url, upgrade);
  }
  

  deleteUpgrades(upgradeId: any): Observable<any> {
    const url = `${this.endPoint}/${upgradeId}`;
    return this.httpClient.delete(url);
  }

}
