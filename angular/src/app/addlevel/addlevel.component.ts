import { Component, OnInit } from '@angular/core';
import { Level } from '../level';
import { LevelService } from '../level.service';

@Component({
  selector: 'app-addlevel',
  templateUrl: './addlevel.component.html',
  styleUrls: ['./addlevel.component.css']
})
export class AddlevelComponent implements OnInit {

  levelNumber: number = 0;
  levelName: string = "";
  pointsFrom: number = 0;
  pointsTo: number = 0;
  inEUR: number = 0;

  levelAdded: boolean = false;
  notanumber: boolean = false;

  constructor(private levelService: LevelService) { }

  addLevel() {
    if(!Number(this.levelNumber) || !Number(this.pointsTo) || !Number(this.inEUR) || this.levelNumber < 0 || this.pointsTo < 0 || this.inEUR < 0) {
      this.notanumber = true;
    }
    else {
      if(!Number(this.pointsFrom) || this.pointsFrom < 0) this.pointsFrom = 0;
      this.levelService.addLevel(this.levelNumber, this.levelName,
                                  this.pointsFrom, this.pointsTo, this.inEUR)
        .subscribe(() => {
          console.log("level added");
          this.levelAdded = true;
        });
    }
    
  }

  ngOnInit(): void {
  }

}
