import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../client';
import { ClientService } from '../client.service';
import { ClientsComponent } from '../clients/clients.component';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {

  changeWhat: boolean[] = [false, false, false, false,
                            false, false, false];
  
  name: string = "";
  surname: string = "";
  emso: number = 0;

  confirmed: boolean = false;

  checkEmso: boolean = false;
  clientDeleted: boolean = false;


  @Input() client?: Client;

  constructor(private clientService: ClientService) { }

  clickedOnChange(index: number): void {
    this.changeWhat[index] = true;
  }

  confirm(whatToChange: string): void {

    if(whatToChange == "name" && this.client) {
      this.clientService.changeClient(this.client, whatToChange, this.name)
        .subscribe(() => {
          console.log("client updated");
          this.confirmed = true;
          if(this.client) this.client.name = this.name
        })
    }
    else if(whatToChange == "surname" && this.client) {
      this.clientService.changeClient(this.client, whatToChange, this.surname)
        .subscribe(() => {
          console.log("client updated");
          this.confirmed = true;
          if(this.client) this.client.surname = this.surname
        })
    }
    else if(whatToChange == "emso" && this.client) {
      if(Number(this.emso)) {
        this.clientService.changeClient(this.client, whatToChange, this.emso)
          .subscribe(() => {
            console.log("client updated");
            this.confirmed = true;
            if(this.client) this.client.emso = this.emso
          })
      }
      else {
        this.checkEmso = true;
      }
    }
  }

  deleteClient(): void {
    if(this.client)
      this.clientService.deleteClient(this.client.id)
        .subscribe(()=> {
          console.log("client deleted");
          this.clientDeleted = true;
        });
  }
  
  ngOnInit(): void {
  }

}
