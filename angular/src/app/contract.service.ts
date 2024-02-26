import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Client } from './client';
import { Contract } from './contract';
import { Product } from './product';
import { User } from './user';


@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contractsUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }


  getContracts(dateFrom?: string, dateTo?: string): Observable<Contract[]> {
    
    return this.http.get<Contract[]>(this.contractsUrl+"ShowContracts"+"from"+dateFrom+"to"+dateTo)
      .pipe(
        catchError(this.handleError<Contract[]>('getContracts', []))
      );
  }

  addContract(product: Product, user: User,
    client: Client, date: String,
    baseValue: number): Observable<User[]> {
    console.log("adding contract")
    let product_id = product.id;
    let user_id = user.id;
    let client_id = client.id;

    return this.http.post<User[]>(this.contractsUrl+"Contracts", {product_id, user_id, client_id, date,
                                                    baseValue})
      .pipe(
        catchError(this.handleError<User[]>('addContract', []))
      )
  }

  payOut(contract: Contract) {
    let contract_id = contract.contract_id
    return this.http.post<any>(this.contractsUrl+"Contracts"+"PayOut", {contract_id})
      .pipe(
        catchError(this.handleError<any>('payOut', []))
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
