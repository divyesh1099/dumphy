import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild("Form")
  addProperty!: NgForm;

  @ViewChild("formTabs")
  formTabs!: TabsetComponent;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishingTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  constructor(private router: Router){}


  ngOnInit(): void {
      
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    console.log("Test", this.addProperty);
  }

  selectTab(tabId: number){
    this.formTabs.tabs[tabId].active = true;
  }
}
