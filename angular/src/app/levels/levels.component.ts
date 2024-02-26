import { Component, OnInit } from '@angular/core';
import { Level } from '../level';
import { LevelService } from '../level.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {

  levels: Level[] = [];

  searchText: string = "";
  
  clickedOnFilter: boolean = false;

  selectedLevel?: Level;

  wrongBorderLevel?: Level;

  constructor(private levelService: LevelService) { }

  filter() {
    //todo
  }

  addLevel() {
    //todo
    //open AddLevelComponent
  }

  setLevel(level: Level): void {
    this.selectedLevel = level;
  }

  getLevels() {
    this.levelService.getLevels()
      .subscribe(lvls => {
        console.log(lvls);
        this.levels = lvls;
        this.checkBorders();
      })
  }

  checkBorders() {
    let points_to = 0;
    for(let level of this.levels) {
      console.log("prev_points_to "+points_to+ ", level.points_from "+level.points_from)
      if(points_to != level.points_from) {
        this.wrongBorderLevel = level;
      }
      points_to = level.points_to;
    }
  }

  ngOnInit(): void {
    this.getLevels();
  }

}
