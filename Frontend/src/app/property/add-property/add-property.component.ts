import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { PropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/completeProperty';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild("Form")
  // addProperty!: NgForm;

  @ViewChild("formTabs")
  formTabs!: TabsetComponent;

  addPropertyForm!: FormGroup;
  nextClicked!: boolean;
  cityList: any[] = [];

  property: Property = new Property();

  propertyView: PropertyBase = {
    Id: 0,
    SellRent: 1,
    Name: '',
    Type: '',
    Price: 0,
    BuiltArea: '',
    City: '',
    RTM: 0
  };

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishingTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];

  constructor(private router: Router, private fb: FormBuilder, private housingService: HousingService, private alertifyService: AlertifyService){}

  createAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: [1, Validators.required],
        BHK: [1],
        Type: ["", Validators.required],
        FurnishingType: [""],
        Name: ['', Validators.required],
        City: ['']
      }),
      PricingInfo: this.fb.group({
        Price: [0, Validators.required],
        BuiltArea: [0, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null]
      }),
      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        Landmark: [null]

      }),
      OtherInfo: this.fb.group({
        RTM: ['No', Validators.required],
        PosessionOn: [null],
        RTMW: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      }),
      PhotoInfo: this.fb.group({

      }),
    })
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.Type = this.Type.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FurnishingType = this.FurnishingType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.Landmark.value;
    this.property.RTM = this.RTM.value;
    this.property.RTMW = this.RTMW.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PosessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  ngOnInit(): void {
      this.createAddPropertyForm();
      this.housingService.getAllCities().subscribe(data=>{
        console.log(data);
        this.cityList = data;
      })
  }

  onBack(){
    this.router.navigate(['/']);
  }

  onSubmit(){
    this.nextClicked = true;
    console.log("Reactive Form Test", this.addPropertyForm);

    // Check If all tabs are valid
    if(this.checkValidtabs()){
      // Map and Save Property
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertifyService.success('Congratulations, Your New Property is Saved and Listed');
    } else {
      this.alertifyService.error('Your Details Are Not Valid, Please Fill Correctly');
    }

    if(this.SellRent.value == 1){
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/rent-property']);
    }
  }

  checkValidtabs(): boolean{
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if(this.PricingInfo.invalid){
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if(this.AddressInfo.invalid){
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if(this.OtherInfo.invalid){
      this.formTabs.tabs[3].active = true;
      return false;
    }
    if(this.PhotoInfo.invalid){
      this.formTabs.tabs[4].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, IsCurrentTabValid: boolean){
    this.nextClicked = true;
    if(IsCurrentTabValid){
      this.formTabs.tabs[tabId].active = true;
    }
  }


  //#region Group Getter Methods
  get BasicInfo(){
    return this.addPropertyForm.controls['BasicInfo'] as FormGroup;
  }

  get PricingInfo(){
    return this.addPropertyForm.controls['PricingInfo'] as FormGroup;
  }

  get AddressInfo(){
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo(){
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }

  get PhotoInfo(){
    return this.addPropertyForm.controls['PhotoInfo'] as FormGroup;
  }
  //#endregion


  //#region BasicInfo Getter Methods
  get SellRent(){
    return this.BasicInfo.controls['SellRent'] as FormControl;
  }

  get BHK(){
    return this.BasicInfo.controls['BHK'] as FormControl;
  }

  get Type(){
    return this.BasicInfo.controls['Type'] as FormControl;
  }

  get FurnishingType(){
    return this.BasicInfo.controls['FurnishingType'] as FormControl;
  }

  get Name(){
    return this.BasicInfo.controls['Name'] as FormControl;
  }

  get City(){
    return this.BasicInfo.controls['City'] as FormControl;
  }
  //#endregion

  //#region PricingInfo Getter Methods
  get Price(){
    return this.PricingInfo.controls['Price'] as FormControl;
  }

  get BuiltArea(){
    return this.PricingInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea(){
    return this.PricingInfo.controls['CarpetArea'] as FormControl;
  }

  get Security(){
    return this.PricingInfo.controls['Security'] as FormControl;
  }

  get Maintenance(){
    return this.PricingInfo.controls['Maintenance'] as FormControl;
  }
  //#endregion

  //#region AddressInfo Getter Methods
  get FloorNo(){
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor(){
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address(){
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get Address2(){
    return this.AddressInfo.controls['Address2'] as FormControl;
  }

  get Landmark(){
    return this.AddressInfo.controls['Landmark'] as FormControl;
  }
  //#endregion

  //#region OtherInfo Getter Methods
  get RTM(){
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PosessionOn(){
    return this.OtherInfo.controls['PosessionOn'] as FormControl;
  }

  get RTMW(){
    return this.OtherInfo.controls['RTMW'] as FormControl;
  }

  get AOP(){
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated(){
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance(){
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description(){
    return this.OtherInfo.controls['Description'] as FormControl;
  }
  //#endregion

}
