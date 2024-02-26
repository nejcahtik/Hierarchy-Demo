import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {

  name: string = "";
  surname: string = "";
  emso: number = 0;
  address: string = "";
  city: string = "";
  email: string = "";

  clientAdded: boolean = false;
  notanumber: boolean = false;

  constructor(private clientService: ClientService) { }

  addClient() {

    if(!Number(this.emso) || this.emso <= 0) {
      this.notanumber = true;
    }
    else {
      this.clientService.addClient(this.name, this.surname,
                                    this.emso, this.address,
                                    this.city, this.email)
        .subscribe(() => {
          console.log("client added")
          this.clientAdded = true;
        });
    }
  }

  ngOnInit(): void {
  }

}
