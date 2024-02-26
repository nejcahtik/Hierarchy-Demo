import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddclientComponent } from './addclient/addclient.component';
import { AddcontractComponent } from './addcontract/addcontract.component';
import { AddlevelComponent } from './addlevel/addlevel.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ClientInfoComponent } from './client-info/client-info.component';
import { ClientsComponent } from './clients/clients.component';
import { ContractInfoComponent } from './contract-info/contract-info.component';
import { ContractsComponent } from './contracts/contracts.component';
import { ExecutedContractInfoComponent } from './executed-contract-info/executed-contract-info.component';
import { ExecutedContractsComponent } from './executed-contracts/executed-contracts.component';
import { LevelInfoComponent } from './level-info/level-info.component';
import { LevelsComponent } from './levels/levels.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductsComponent } from './products/products.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'myprofile', component: MyprofileComponent},
  { path: 'users', component: UsersComponent },
  { path: 'levels', component: LevelsComponent },
  { path: 'contracts', component: ContractsComponent },
  { path: 'executed-contracts', component: ExecutedContractsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'clients', component: ClientsComponent },
  { path: 'adduser', component: AdduserComponent },
  { path: 'addlevel', component: AddlevelComponent },
  { path: 'addcontract', component: AddcontractComponent },
  { path: 'addproduct', component: AddproductComponent },
  { path: 'addclient', component: AddclientComponent },
  { path: 'user-info', component: UserInfoComponent },
  { path: 'level-info', component: LevelInfoComponent },
  { path: 'contract-info', component: ContractInfoComponent },
  { path: 'executed-contract-info', component: ExecutedContractInfoComponent },
  { path: 'product-info', component: ProductInfoComponent },
  { path: 'client-info', component: ClientInfoComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
