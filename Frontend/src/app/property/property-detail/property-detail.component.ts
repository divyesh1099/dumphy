import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/completeProperty';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  public property = new Property();
  constructor(private route: ActivatedRoute, private router: Router, private housingService: HousingService){}
  ngOnInit(){

    // "+" converts string to number
    this.propertyId = +this.route.snapshot.params['Id'];

    // Resolver method to avoid loading of component if teh API does not return the appropriate data
    // this.route.data.subscribe(
    //   data =>{
    //     this.property = data["prp"];
    //   }
    // )

    // A Router Link Does Not get instantiated if it is on the same route, because of performance reasons. 
    // So our URL may change but our Componet Does not refresh. 
    // (Because why to re render a component if we are on the same component)
    // To get the updated Compnent, we do this
    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['Id'];
        this.housingService.getProperty(this.propertyId).subscribe(
          data=> {
            this.property.Name = data!.Name;
            this.property.BHK = data!.BHK!;
            this.property.Type = data!.Type;
            this.property.FurnishingType = data!.FurnishingType!;
            this.property.Price = data!.Price;
            this.property.City = data!.City!;
            this.property.BuiltArea = data!.BuiltArea!;
            this.property.CarpetArea = data!.CarpetArea!;
            this.property.FloorNo = data!.FloorNo;
            this.property.Gated = data!.Gated;
            this.property.AOP = data!.AOP;
            this.property.Security = data!.Security;
            this.property.Possession = data!.Possession;
            this.property.Maintenance = data!.Maintenance;
            this.property.Description = data!.Description;
            this.property.Image = data!.Image;
          }, error => this.router.navigate(['/'])
        )
      }
    )
    // this way we get the updated route when the parameters are changed and not always. thus change leads to updation
  }

}
