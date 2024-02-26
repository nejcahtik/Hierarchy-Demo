import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { UsersComponent } from './users/users.component';
import { AdduserComponent } from './adduser/adduser.component';
import { LevelsComponent } from './levels/levels.component';
import { ProductsComponent } from './products/products.component';
import { ClientsComponent } from './clients/clients.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ExecutedContractsComponent } from './executed-contracts/executed-contracts.component';
import { AddlevelComponent } from './addlevel/addlevel.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddcontractComponent } from './addcontract/addcontract.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ContractInfoComponent } from './contract-info/contract-info.component';
import { ExecutedContractInfoComponent } from './executed-contract-info/executed-contract-info.component';
import { LevelInfoComponent } from './level-info/level-info.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { AddclientComponent } from './addclient/addclient.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core'; 
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DatePipe } from '@angular/common'
import  { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

import { MatSliderModule } from "@angular/material/slider";
import {   MatFormFieldModule } from "@angular/material/form-field";


@NgModule({
  declarations: [
    AppComponent,
    MyprofileComponent,
    UsersComponent,
    AdduserComponent,
    LevelsComponent,
    ProductsComponent,
    ClientsComponent,
    ContractsComponent,
    ExecutedContractsComponent,
    AddlevelComponent,
    AddproductComponent,
    AddcontractComponent,
    UserInfoComponent,
    ProductInfoComponent,
    ContractInfoComponent,
    ExecutedContractInfoComponent,
    LevelInfoComponent,
    ClientInfoComponent,
    AddclientComponent,
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

