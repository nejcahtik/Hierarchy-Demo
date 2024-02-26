import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Data } from '@angular/router';
import { User } from './user';
import { Level } from './level';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl: string = "http://localhost:8080/Users";

  constructor(private http: HttpClient) { }



  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      )
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.usersUrl + "/" + userId.toString())
      .pipe(
        catchError(this.handleError<User>('getUser'))
      )
  }

  addUser(name: string, surname: string, personal_points: number,
          networking_points: number, paid_points: number, 
          cash: number, paid_cash: number,
          emso: number, municipality: string, geolocation: string,
          trr: string, bank: string, employment_contract_date: string, 
          mentor: User,  level: Level, date_of_mentorship: string) {

    let mentor_id = mentor.id;
    let level_id = level.level_id;

    return this.http.post<any>(this.usersUrl, {name, surname, mentor_id, personal_points, 
                                                networking_points, paid_points, cash, paid_cash,
                                                emso, municipality, geolocation, trr,
                                                bank, employment_contract_date, date_of_mentorship})
      .pipe(
        catchError(this.handleError<any>('addUser', []))
      )
  }

  deleteUser(user_id: number) {
    return this.http.get<any>(this.usersUrl+"Delete"+"/"+user_id.toString())
      .pipe(
        catchError(this.handleError<any>('deleteUser', []))
      )
  }

  getActualLevel(points: number): Observable<Level> {
    return this.http.post<Level>(this.usersUrl+"/ActualLevel", {points})
      .pipe(
        catchError(this.handleError<any>('getActualLevel'))
      )
  }


  changeUser(user: User, what_to_change?: string, new_value?: any): Observable<any> {

    let user_id = user.id
    
    return this.http.post(this.usersUrl + "Change", {user_id, what_to_change, new_value})
      .pipe(
        catchError(this.handleError<any>('changeUser'))
      )
  }



  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      //this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
  };
}
}
