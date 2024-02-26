import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user-service.service';
import { UsersComponent } from '../users/users.component';
import {FormControl} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormGroup} from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  changeWhat: boolean[] = [false, false, false, false, false, false,
                          false, false, false, false, false,
                          false, false, false, false, false,
                          false, false];
  name: string = "";
  surname: string = "";
  mentorName: string = "";
  mentorSurname: string = "";
  mentorshipDate: Date = new Date();
  emso: number = 0;
  municipality: string = "";
  geolocation: string = "";
  trr: string = "";
  bank: string = "";
  employmentDate: Date = new Date();
  prevUsers: User[] = [];
  userDeleted: boolean = false;

  //todo
  @Input() user?: User;

  mentor?: User;

  confirmed: boolean = false;

  showMntrs: boolean = false;

  mentors: User[] = [];

  checkEmso: boolean = false;
  checkEmploymentDate: boolean = false;
  checkMentorshipDate: boolean = false;



  

  constructor(private userService: UserService,
              public datepipe: DatePipe) { }

  clickedOnChange(index: number): void {
    this.changeWhat[index] = true;
  }

  getMentors(): void {
    this.userService.getUsers()
      .subscribe(mntrs => {
        console.log(mntrs);
        this.mentors = mntrs;
      })
  }

  showMentors() {
    this.getMentors();
    this.showMntrs = true;
  }

  deleteUser(): void {
    if(this.user)
      this.userService.deleteUser(this.user.id)
        .subscribe(() => {
          console.log("user deleted")
          this.userDeleted = true;
        });
  }

  addThisMentor(mentor: User): void {
    if(this.user) { 
      this.userService.changeUser(this.user, "mentor", mentor.id)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
          this.showMntrs = false;
          if(this.user) {
            this.user.mentor_name = mentor.name;
            this.user.mentor_surname = mentor.surname;
            this.user.mentor_id = mentor.id
          }
      });
      this.changeWhat[3] = false;
    }
  }

  backToAllUsers() {
    this.user = undefined;
  }

  confirm(whatToChange: string): void {

    if(whatToChange == "name" && this.user) {
      this.userService.changeUser(this.user, whatToChange, this.name)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
        });
        this.changeWhat[1] = false;
    }
    else if(whatToChange == "surname" && this.user) {
      this.userService.changeUser(this.user, whatToChange, this.surname)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
      });
      this.changeWhat[2] = false;

    }
    else if(whatToChange == "date_of_mentorship" && this.user) {
      if(this.mentorshipDate instanceof Date) {
        this.userService.changeUser(this.user, whatToChange, this.datepipe.transform(this.employmentDate, 'yyyy-MM-dd'))
          .subscribe(() => {
            console.log("user changed");
            this.confirmed = true;
            if(this.user) this.user.date_of_mentorship = this.mentorshipDate;
        });
        this.changeWhat[4] = false;
      }
      else {
        this.checkMentorshipDate = true;
      }

    }
    else if(whatToChange == "emso" && this.user) {
      if(Number(this.emso) && this.emso > 0) {
        this.userService.changeUser(this.user, whatToChange, this.emso)
          .subscribe(() => {
            console.log("user changed");
            this.confirmed = true;
            if(this.user) this.user.emso = this.emso;
        });
        this.changeWhat[12] = false;
      }
      else {
        this.checkEmso = true;
      }

    }
    else if(whatToChange == "municipality" && this.user) {
      this.userService.changeUser(this.user, whatToChange, this.municipality)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
          if(this.user) this.user.municipality = this.municipality;
      });
      this.changeWhat[13] = false;

    }
    else if(whatToChange == "geolocation" && this.user) {
      this.userService.changeUser(this.user, whatToChange, this.geolocation)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
          if(this.user) this.user.geolocation = this.geolocation;
      });
      this.changeWhat[14] = false;

    }
    else if(whatToChange == "trr" && this.user) {
      this.userService.changeUser(this.user, whatToChange, this.trr)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
          if(this.user) this.user.trr = this.trr;
      });
      this.changeWhat[14] = false;

    }
    else if(whatToChange == "bank" && this.user) {
      this.userService.changeUser(this.user, whatToChange, this.bank)
        .subscribe(() => {
          console.log("user changed");
          this.confirmed = true;
          if(this.user) this.user.bank = this.bank;
      });
      this.changeWhat[16] = false;

    }
    else if(whatToChange == "employment_contract_date" && this.user) {
      if(this.employmentDate instanceof Date) {
        this.userService.changeUser(this.user, whatToChange, this.datepipe.transform(this.employmentDate, 'yyyy-MM-dd'))
          .subscribe(() => {
            console.log("user changed");
            this.confirmed = true;
            if(this.user) this.user.employment_contract_date = this.employmentDate;
        });
        this.changeWhat[17] = false;
      }
      else {
        this.checkEmploymentDate = true;
      }
    }
  }
  moreInfoMentor() {
    if(this.user) 
      this.userService.getUser(this.user.mentor_id)
        .subscribe(mntr => {
          console.log("fetching mentor")
          if(this.user)
            this.prevUsers?.push(this.user);
            this.user = mntr;
        });
  }
  goToPrevUser() {
    this.user = this.prevUsers?.pop();
  }

  ngOnInit(): void {
    console.log("user-info-component initializing")
    if(this.user) console.log(this.user.employment_contract_date)
  }

}
