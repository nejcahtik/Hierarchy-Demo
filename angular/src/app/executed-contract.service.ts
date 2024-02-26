import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ExecutedContract } from './executed-contract';


@Injectable({
  providedIn: 'root'
})
export class ExecutedContractService {

  executedContractsUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }


  getExecutedContracts(dateFrom?: string, dateTo?: string): Observable<ExecutedContract[]> {
    
    return this.http.get<ExecutedContract[]>(this.executedContractsUrl+"ShowExecutedContracts"+"from"+dateFrom+"to"+dateTo)
      .pipe(
        catchError(this.handleError<ExecutedContract[]>('getExecutedContracts', []))
      );
  }

  payOut(ex_contract: ExecutedContract) {
    let ex_contract_id = ex_contract.contract_id
    return this.http.post<any>(this.executedContractsUrl+"ExecutedContracts"+"PayOut", {ex_contract_id})
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
