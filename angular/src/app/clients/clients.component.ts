import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[] = [];

  searchText: string = "";
  
  clickedOnFilter: boolean = false;

  selectedClient?: Client;

  constructor(private clientService: ClientService) { }

  filter() {
    //todo
  }

  setClient(client: Client): void {
    this.selectedClient = client;
  }

  addClient() {
    //todo
    //open AddClientComponent
  }

  getClients() {
    this.clientService.getClients()
      .subscribe((clts) => {
        console.log(clts);
        this.clients = clts;
      })
  }

  ngOnInit(): void {
    this.getClients();
  }

}
