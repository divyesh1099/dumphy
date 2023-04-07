import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PropertyBase } from '../model/IPropertyBase';
import { Property } from '../model/completeProperty';

@Injectable({
  providedIn: 'root'
})

export class HousingService {

  constructor(private http: HttpClient) { }

  getAllProperties(SellRent: number): Observable<Array<PropertyBase>>{
    return this.http.get<Array<PropertyBase>>("data/properties.json").pipe(
      map(data=> {
        const propertiesArray : Array<PropertyBase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp')!);
        if(localProperties){
          localProperties.forEach((localProperty: Property) => {
            if(localProperty.SellRent === SellRent){
              propertiesArray.push(localProperty);
            }
          })
        }
        data.forEach(property => {
          if(property.SellRent === SellRent){
            propertiesArray.push(property);
          }
        });
        return propertiesArray;
      })
    );
  }

  addProperty(property: Property){
    let newProp = [property];
    if(localStorage.getItem('newProp')){
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp')!)]
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropId(){
    if(localStorage.getItem('PID')){
      return +localStorage.getItem('PID')! + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101
    }
  }
}
