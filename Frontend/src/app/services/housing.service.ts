import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PropertyBase } from '../model/IPropertyBase';

@Injectable({
  providedIn: 'root'
})

export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<Array<PropertyBase>>{
    return this.http.get<Array<PropertyBase>>("data/properties.json").pipe(
      map(data=> {
        const propertiesArray : Array<PropertyBase> = [];
        data.forEach(property => {
          if(property.SellRent === SellRent){
            propertiesArray.push(property);
          }
        });
        return propertiesArray;
      })
    );
  }
}
