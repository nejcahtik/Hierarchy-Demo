import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExecutedContract } from '../executed-contract';
import { ExecutedContractService } from '../executed-contract.service';

@Component({
  selector: 'app-executed-contracts',
  templateUrl: './executed-contracts.component.html',
  styleUrls: ['./executed-contracts.component.css']
})
export class ExecutedContractsComponent implements OnInit {

  executedContracts: ExecutedContract[] = [];

  searchText: string = "";

  clickedOnFilter: boolean = false;

  selectedExecutedContract?: ExecutedContract;

  dateFrom?: Date;
  dateTo?: Date;

  constructor(private contractService: ExecutedContractService,
              private datepipe: DatePipe) { }

  filter() {
    //todo
  }

  payOut(ex_contract: ExecutedContract): void {
    this.contractService.payOut(ex_contract)
      .subscribe(() => {
        console.log("paying executed contract")
        this.getExecutedContracts();
      })
  }

  setExecutedContract(ex_contract: ExecutedContract): void {
    this.selectedExecutedContract = ex_contract;
  }

  getExecutedContracts() {
    let dateTo = this.datepipe.transform(this.dateTo, 'yyyy-MM-dd')
    let dateFrom = this.datepipe.transform(this.dateFrom, 'yyyy-MM-dd')
    if(dateTo && dateFrom) {
      this.contractService.getExecutedContracts(dateFrom, dateTo)
        .subscribe(excntrs => {
          console.log(excntrs);
          this.executedContracts = excntrs;
        })
    }
  }

  ngOnInit(): void {
    this.getExecutedContracts();
  }

}
