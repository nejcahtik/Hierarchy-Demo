import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Client } from './client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsUrl: string = "http://localhost:8080/Clients";

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    
    return this.http.get<Client[]>(this.clientsUrl)
      .pipe (
        catchError(this.handleError<Client[]>('getClients', []))
      );
  }

  changeClient(client: Client, what_to_change?: string, new_value?: any): Observable<any> {
    let client_id = client.id
    return this.http.post(this.clientsUrl + "Change", {client_id, what_to_change, new_value})
      .pipe(
        catchError(this.handleError<any>('updateClient'))
      );
  }


  addClient(name: string, surname: string, 
              emso: number, address: string,
              city: string, email: string) {
    return this.http.post<any>(this.clientsUrl, {name, surname, emso, 
                                                  address, city, email})
      .pipe(
        catchError(this.handleError<any>('addClient', []))
      )
  }

  deleteClient(client_id: number) {
    return this.http.get<any>(this.clientsUrl+"Delete"+"/"+client_id.toString())
      .pipe(
        catchError(this.handleError<any>('deleteClient', []))
      )
  }


  private handleError<T>(operation = 'operation', result ?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      //this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }
}
