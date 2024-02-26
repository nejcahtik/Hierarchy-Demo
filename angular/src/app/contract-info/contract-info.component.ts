import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';
import { ContractsComponent } from '../contracts/contracts.component';
import { Product } from '../product';
import { User } from '../user';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.css']
})
export class ContractInfoComponent implements OnInit {

  selectedUser?: User;
  selectedProduct?: Product;
  selectedClient?: Client;


  @Input() contract?: Contract;


  constructor(private contractService: ContractService) { }

  moreInfoUser() {
    if(this.contract)
      this.selectedUser = this.contract.user;
      this.selectedProduct = undefined;
      this.selectedClient = undefined;
  }
  moreInfoProduct() {
    if(this.contract) 
      this.selectedProduct = this.contract.product;
      this.selectedClient = undefined;
      this.selectedUser = undefined;
  }
  moreInfoClient() {
    if(this.contract)
      this.selectedClient = this.contract.client;
      this.selectedUser = undefined;
      this.selectedProduct = undefined;


  }

  payOut() {
    if(this.contract)
      this.contractService.payOut(this.contract)
        .subscribe(() => {
          console.log("paying contract")
          if(this.contract)  
            this.contract.paid_out = "YES";
        })
  }

  ngOnInit(): void {
    console.log("deli pls")
  }

}
