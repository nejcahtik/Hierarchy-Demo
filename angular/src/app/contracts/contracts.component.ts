import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  contracts: Contract[] = [];

  searchText: string = "";

  clickedOnFilter: boolean = false;

  selectedContract?: Contract;

  dateTo?: Date;
  dateFrom?: Date;

  constructor(private contractService: ContractService,
              private datepipe: DatePipe) { }

  filter() {
    //todo
  }

  setContract(contract: Contract): void {
    this.selectedContract = contract;
  }

  getContracts() {
    let dateTo = this.datepipe.transform(this.dateTo, 'yyyy-MM-dd')
    let dateFrom = this.datepipe.transform(this.dateFrom, 'yyyy-MM-dd')
    if(dateTo && dateFrom) {
      this.contractService.getContracts(dateFrom, dateTo)
        .subscribe(cntrs => {
          console.log(cntrs);
          this.contracts = cntrs;
        })
    }
  }

  payOut(contract: Contract): void {
    this.contractService.payOut(contract)
      .subscribe(() => {
        console.log("paying contract")
        this.getContracts();
      })
  }

  ngOnInit(): void {
    this.getContracts();
  }

}
