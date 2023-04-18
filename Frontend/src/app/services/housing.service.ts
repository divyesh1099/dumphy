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

  getAllCities(): Observable<any[]>{
    return this.http.get<any[]>('https://localhost:7006/api/City');
  }

  getProperty(id: number){
    return this.getAllProperties().pipe(
      map(properties => {

        return properties.find(property => property.Id == id)!;
      })
    )
  }

  getAllProperties(SellRent?: number): Observable<Array<Property>>{
    return this.http.get<Array<Property>>("data/properties.json").pipe(
      map(data=> {
        const propertiesArray : Array<Property> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp')!);
        if(localProperties){

          for(const id in localProperties){
            if(SellRent){
              if(localProperties.hasOwnProperty(id) && localProperties[id].SellRent == SellRent){
                propertiesArray.push(localProperties[id]);
              }
            } else{
              propertiesArray.push(localProperties[id]);
            }
          }
        }

        for(const id in data){
          if(SellRent) {
            if(data.hasOwnProperty(id) && data[id].SellRent == SellRent){
              propertiesArray.push(data[id]);
            }
          } else {
            propertiesArray.push(data[id]);

          }
        }

        return propertiesArray;
      })
    )!;
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
