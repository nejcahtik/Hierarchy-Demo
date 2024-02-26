import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  userName: string = "";
  userSurname: string = "";
  userAdded: boolean = false;
  clickedOnFilter: boolean = false;

  searchText: string = "";

  selectedUser?: User;

  constructor(private userService: UserService) { }

  filter() {
    this.clickedOnFilter = true;
    //todo
  }



  setUser(user: User) {
    this.selectedUser = user;
  }

  addUser() {
    //todo
    //open AddUserComponent
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(usrs => {
        console.log(usrs);
        this.users = usrs;
      })
  }

  ngOnInit(): void {
    this.getUsers();
  }

}
