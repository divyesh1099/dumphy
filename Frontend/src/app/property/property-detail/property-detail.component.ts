import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId!: number;
  constructor(private route: ActivatedRoute, private router: Router){}
  ngOnInit(){
    // "+" converts string to number
    this.propertyId = +this.route.snapshot.params['Id'];

    // A Router Link Does Not get instantiated if it is on the same route, because of performance reasons. 
    // So our URL may change but our Componet Does not refresh. 
    // (Because why to re render a component if we are on the same component)
    // To get the updated Compnent, we do this
    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['Id']
      }
    )
    // this way we get the updated route when the parameters are changed and not always. thus change leads to updation
  }

  onSelectNext(){
    this.propertyId += 1;
    this.router.navigate(['property-detail', this.propertyId]);
  }
}
