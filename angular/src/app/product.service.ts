import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsUrl: string = "http://localhost:8080/Products";

  constructor(private http: HttpClient) { }


  getProducts(): Observable<Product[]> {

    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  }

  addProduct(productName: string, productPartner: string,
    constant: number, planValue: string, basicName: string,
    planType: string, productType: string, planName: string, bcv: number,
    pointsEarned: number, pointsToBePaid: string,
    pointsForCareer: string, satbppr: string) {

    return this.http.post<any>(this.productsUrl, {productName, productPartner,
      constant, planValue, basicName,
      planType, productType, planName, bcv,
      pointsEarned, pointsToBePaid,
      pointsForCareer, satbppr})
      .pipe(
        catchError(this.handleError<any>('addProduct', []))
      );
  }

  changeProduct(product: Product, what_to_change?: string, new_value?: any) {

    let product_id = product.id

    return this.http.post(this.productsUrl+"Change", {product_id, what_to_change, new_value})
      .pipe(
        catchError(this.handleError<any>('changeProduct'))
      );
  }

  deleteProduct(product_id: number) {
    return this.http.get<any>(this.productsUrl+"Delete"+"/"+product_id.toString())
      .pipe(
        catchError(this.handleError<any>('deleteProduct', []))
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
