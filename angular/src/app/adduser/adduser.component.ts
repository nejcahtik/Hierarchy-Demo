import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Level } from '../level';
import { LevelService } from '../level.service';
import { User } from '../user';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userName: string = "";
  userSurname: string = "";
  mentor?: User;
  personalPoints: number = 0;
  networkingPoints: number = 0;
  paidPoints: number = 0;
  cash: number = 0;
  paidCash: number = 0;
  level?: Level;
  emso: number = 0;
  municipality: string = "";
  geolocation: string = "";
  trr: string = "";
  bank: string = "";
  date: Date = new Date();
  mentorshipDate: Date = new Date();

  user?: User = undefined;

  userAdded: boolean = false;
  showLvls: boolean = false;
  showMntrs: boolean = false;
  notanumber: boolean = false;

  mentors: User[] = [];

  levels: Level[] = [];
  actual_level?: Level;


  constructor(private userService: UserService,
              private levelService: LevelService,
              private datepipe: DatePipe) { }


  anotherUser(): void {
    this.userAdded = false;

  }
  
  addUser() {
    let thementorshipdate = this.datepipe.transform(this.mentorshipDate, 'yyyy-MM-dd')
    let thedate = this.datepipe.transform(this.date, 'yyyy-MM-dd')
    if(this.mentor != null && this.level != null && thedate && thementorshipdate && Number(this.emso) && this.emso > 0) {
      if(!Number(this.personalPoints) || this.personalPoints < 0) this.personalPoints = 0;
      if(!Number(this.networkingPoints) || this.networkingPoints < 0) this.networkingPoints = 0;
      if(!Number(this.paidPoints) || this.paidPoints < 0) this.paidPoints = 0;
      if(!Number(this.cash) || this.cash < 0) this.cash = 0;
      if(!Number(this.paidCash) || this.paidCash < 0) this.paidCash = 0;
      this.userService.addUser(this.userName, this.userSurname, 
                                this.personalPoints, 
                                this.networkingPoints, this.paidPoints, this.cash, 
                                this.paidCash, this.emso, 
                                this.municipality, this.geolocation, this.trr,
                                this.bank, thedate,
                                this.mentor, this.level, thementorshipdate)
        .subscribe(() => {
          this.userAdded = true;
        });
    }
    else {
      this.notanumber = true;
    }
  }

  showLevels(): void {
    this.getLevels();
    this.showLvls = true;
  }
  showMentors(): void {
    this.getMentors();
    this.showMntrs = true;
  }

  addThisMentor(mntr: User): void {
    this.showMntrs = false;
    console.log(mntr.id)
    this.mentor = mntr;
  }
  addThisLevel(lvl: Level): void {
    this.showLvls = false;
    this.level = lvl;
  }
  
  getMentors(): void {
    this.get_actual_level();
    this.userService.getUsers()
      .subscribe(mntrs => {
        console.log(mntrs);
        this.mentors = mntrs;
      })
  }

  get_actual_level() {
    if(!Number(this.personalPoints) || this.personalPoints < 0) this.personalPoints = 0;
    if(!Number(this.networkingPoints) || this.networkingPoints < 0) this.networkingPoints = 0;
      this.userService.getActualLevel(this.personalPoints + this.networkingPoints)
        .subscribe(aclvl => {
          console.log("fetching actual leve");
          this.actual_level = aclvl;
          this.level = aclvl;
        })
  }

  getLevels(): void {
    this.levelService.getLevels()
      .subscribe(lvls => {
        console.log("all levels fetched");
        this.levels = lvls;
      })
  }


  ngOnInit(): void {
  }

}
