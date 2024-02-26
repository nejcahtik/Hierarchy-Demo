import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client';
import { ExecutedContract } from '../executed-contract';
import { ExecutedContractsComponent } from '../executed-contracts/executed-contracts.component';
import { Product } from '../product';
import { User } from '../user';

@Component({
  selector: 'app-executed-contract-info',
  templateUrl: './executed-contract-info.component.html',
  styleUrls: ['./executed-contract-info.component.css']
})
export class ExecutedContractInfoComponent implements OnInit {

  @Input() executedContract?: ExecutedContract;

  selectedUser?: User;
  selectedProduct?: Product;
  selectedClient?: Client;


  constructor() { }

  ngOnInit(): void {
  }

  moreInfoUser() {
    if(this.executedContract)
      this.selectedUser = this.executedContract.user;
      this.selectedProduct = undefined;
      this.selectedClient = undefined;
  }
  moreInfoProduct() {
    if(this.executedContract) 
      this.selectedProduct = this.executedContract.product;
      this.selectedClient = undefined;
      this.selectedUser = undefined;
  }
  moreInfoClient() {
    if(this.executedContract)
      this.selectedClient = this.executedContract.client;
      this.selectedUser = undefined;
      this.selectedProduct = undefined;


  }

}
