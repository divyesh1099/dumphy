import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Property } from '../property/IProperty.interface';

@Injectable({
  providedIn: 'root'
})

export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<Array<Property>>{
    return this.http.get<Array<Property>>("data/properties.json").pipe(
      map(data=> {
        const propertiesArray : Array<Property> = [];
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
