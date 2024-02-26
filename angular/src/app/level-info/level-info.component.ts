import { Component, OnInit, Input } from '@angular/core';
import { Level } from '../level';
import { LevelService } from '../level.service';
import { LevelsComponent } from '../levels/levels.component';

@Component({
  selector: 'app-level-info',
  templateUrl: './level-info.component.html',
  styleUrls: ['./level-info.component.css']
})
export class LevelInfoComponent implements OnInit {

  changeWhat: boolean[] = [false, false, false,
                            false, false, false]

  levelNumber: number = 0;
  name: string = "";
  pointsFrom: number = 0;
  pointsTo: number = 0;
  inEUR: number = 0;
  checkPointsFrom: boolean = false;
  checkPointsTo: boolean = false;
  checkLevelNumber: boolean = false;
  checkInEur: boolean = false;

  @Input() level?: Level;

  confirmed: boolean = false;

  levelDeleted: boolean = false;

  constructor(private levelService: LevelService) { }

  clickedOnChange(index: number): void {
    this.changeWhat[index] = true;
  }

  deleteLevel(): void {
    if(this.level)
      this.levelService.deleteLevel(this.level.level_id)
        .subscribe(() => {
          console.log("level deleted");
          this.levelDeleted = true;
        });
  }

  confirm(whatToChange: string): void {

    if(whatToChange == "level_number" && this.level) {
      if(Number(this.levelNumber)) {
        this.levelService.changeLevel(this.level, whatToChange, this.levelNumber)
          .subscribe(() => {
            console.log("level updated");
            this.confirmed = true;
            if(this.level) this.level.level_number = this.levelNumber;

          });
      }
      else {
        this.checkLevelNumber = true;
      }
    }
    else if(whatToChange == "level_name" && this.level) {
      this.levelService.changeLevel(this.level, whatToChange, this.name)
        .subscribe(() => {
          console.log("level updated");
          this.confirmed = true;
          if(this.level) this.level.level_name = this.name;

        });
    }
    else if(whatToChange == "points_from" && this.level) {
      if(!Number(this.pointsFrom) || this.pointsFrom < 0) {this.pointsFrom = 0;}

      this.levelService.changeLevel(this.level, whatToChange, this.pointsFrom)
        .subscribe(() => {
          console.log("level updated");
          this.confirmed = true;
          if(this.level) this.level.points_from = this.pointsFrom;

        });
    }
    else if(whatToChange == "points_to" && this.level) {
      if(Number(this.pointsTo) && this.pointsTo > 0) {
        this.levelService.changeLevel(this.level, whatToChange, this.pointsTo)
          .subscribe(() => {
            console.log("level updated");
            this.confirmed = true;
            if(this.level) this.level.points_to = this.pointsTo;
          });
      }
      else {
        this.checkPointsTo = true;
      }
    }
    else if(whatToChange == "in_eur" && this.level) {
      if(Number(this.inEUR) && this.inEUR > 0) {
        this.levelService.changeLevel(this.level, whatToChange, this.inEUR)
          .subscribe(() => {
            console.log("level updated");
            this.confirmed = true;
            if(this.level) this.level.in_eur = this.inEUR;
          });
      }
      else {
        this.checkInEur = true;
      }
    }


  }

  ngOnInit(): void {
  }

}
