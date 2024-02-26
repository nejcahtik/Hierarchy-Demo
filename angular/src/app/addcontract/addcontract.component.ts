import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { throwIfEmpty } from 'rxjs/operators';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { Contract } from '../contract';
import { ContractService } from '../contract.service';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrls: ['./addcontract.component.css']
})
export class AddcontractComponent implements OnInit {

  productName: string = "";
  userName: string = "";
  userSurname: string = "";
  clientName: string = "";
  clientSurname: string = "";
  date: Date = new Date()
  baseValue: number = 0;

  contractAdded: boolean = false;

  contract?: Contract = undefined;

  product?: Product;
  user?: User;
  client?: Client;

  showPrtc: boolean = false;
  showUsrs: boolean = false;
  showClnts: boolean = false;

  products: Product[] = [];
  users: User[] = [];
  clients: Client[] = [];

  notanumber: boolean = false;
  selectedUser?: User;
  outgrownusers?: User[];

  responseError: boolean = false;

  constructor(private contractService: ContractService,
              private userService: UserService,
              private clientService: ClientService,
              private productService: ProductService,
              public datepipe: DatePipe) { }

  addContract() {
    if(!Number(this.baseValue) || this.baseValue <= 0) {
      this.notanumber = true;
    }
    else if(this.product != null && this.client != null && this.user != null) {
      
      let thedate = this.datepipe.transform(this.date, 'yyyy-MM-dd')
      if(thedate)
        this.contractService.addContract(this.product, this.user,
                                          this.client, thedate,
                                          this.baseValue)
          .subscribe(otgrwnusrs => {
            console.log(otgrwnusrs);
            this.contractAdded = true;
            this.responseError = true;
            this.outgrownusers = otgrwnusrs;

          });
    }
  
  }

  setUser(user: User): void {
    this.selectedUser = user;
  }

  showProducts(): void {
    this.getProducts()
    this.showPrtc = true;
  }
  showClients(): void {
    this.getClients();
    this.showClnts = true;
  }
  showUsers(): void {
    this.getUsers();
    this.showUsrs = true;
  }

  addThisProduct(prtc: Product): void {
    this.showPrtc = false;
    this.product = prtc;
  }
  addThisUser(usr: User): void {
    this.showUsrs = false;
    this.user = usr;
  }
  addThisClient(clnt: Client): void {
    this.showClnts = false;
    this.client = clnt;
  }

  goBackToContract() {
    this.selectedUser = undefined;
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe(prcts => {
        console.log("products fetched");
        this.products = prcts;
      })
  }
  getClients(): void {
    this.clientService.getClients()
      .subscribe(clnts => {
        console.log("clients fetched");
        this.clients = clnts;
      })
  }
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(usrs => {
        console.log("users fetched");
        this.users = usrs;
      })
  }


  ngOnInit(): void {
  }

}
