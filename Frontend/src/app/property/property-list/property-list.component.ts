import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from 'src/app/services/housing.service';
import { PropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/completeProperty';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  SellRent: number = 1;
  properties: Array<PropertyBase> = [];

  constructor (private route: ActivatedRoute, private housingService: HousingService) {}

  ngOnInit(): void {

    if(this.route.snapshot.url.toString()){
      this.SellRent = 2; // This means we are on Sell/Rent Page and Not on Home Page, because we are using same component for both pages
    }

    this.housingService.getAllProperties(this.SellRent).subscribe(data => {
      this.properties = data;
      const newProperty: Property = JSON.parse(localStorage.getItem('newProp')!);
      if(newProperty.SellRent == this.SellRent){
        this.properties = [newProperty, ...this.properties];
      }
    }, error => {
      console.log(error);
    });
  }
  
}
