import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HousingService } from './services/housing.service';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { DefaultPagesComponent } from './default-pages/default-pages.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserService } from './services/user.service';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { PropertyDetailResolverService } from './property/property-detail/property-detail-resolver.service';
import { FilterPipe } from './Pipes/filter.pipe';
import { SortPipe } from './Pipes/sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PropertyCardComponent,
    PropertyListComponent,
    NavBarComponent,
    AddPropertyComponent,
    PropertyDetailComponent,
    DefaultPagesComponent,
    UserLoginComponent,
    UserRegisterComponent,
    FilterPipe,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule, 
    BrowserAnimationsModule, 
    BsDropdownModule.forRoot(), 
    TabsModule.forRoot(), 
    ButtonsModule.forRoot(), 
    BsDatepickerModule.forRoot(),
  ],
  providers: [
    HousingService, 
    UserService, 
    AlertifyService, 
    AuthService,
    PropertyDetailResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
