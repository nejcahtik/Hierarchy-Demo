import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Level } from './level';


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  levelsUrl: string = "http://localhost:8080/Levels";

  constructor(private http: HttpClient) { }

  getLevels(): Observable<Level[]> {
    
    return this.http.get<Level[]>(this.levelsUrl)
      .pipe(
        catchError(this.handleError<Level[]>('getLevels', []))
      );
  }

  addLevel(levelNumber: number, levelName: string,
    pointsFrom: number, pointsTo: number, inEUR: number) {

    return this.http.post<any>(this.levelsUrl, {levelNumber, levelName,
                                                  pointsFrom, pointsTo, inEUR})
      .pipe(
        catchError(this.handleError<Level[]>('addLevel', []))
      )
  }

  deleteLevel(level_id: number) {
    return this.http.get<any>(this.levelsUrl+"Delete"+"/"+level_id.toString())
      .pipe(
        catchError(this.handleError<any>('deleteLevel', []))
      )
  }

  changeLevel(level: Level, what_to_change?: string, new_value?: any) {

    let level_id = level.level_id
    return this.http.post(this.levelsUrl + "Change", {level_id, what_to_change, new_value})
      .pipe(
        catchError(this.handleError<any>('changeLevel'))
      );
  }

  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      //this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }



}
