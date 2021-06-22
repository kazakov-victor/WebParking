import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Price} from '../shared/price';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private priceUrl = '/price';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            charset: 'UTF-8' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET prices from the server */
  getPrices(): Observable<Price[]> {
    return this.http.get<Price[]>(`${environment.BackUrl}${this.priceUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched prices')),
        catchError(this.handleError<Price[]>('getPrices', []))
      );
  }

  /** GET price by id. Return `undefined` when id not found */
  getPriceNo404<Data>(id: number): Observable<Price> {
    const url = `${environment.BackUrl}${this.priceUrl}/?id=${id}`;
    return this.http.get<Price[]>(url)
      .pipe(
        map(prices => prices[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} price id=${id}`);
        }),
        catchError(this.handleError<Price>(`getPrice id=${id}`))
      );
  }

  /** GET price by id. Will 404 if id not found */
  getPrice(id: number): Observable<Price> {
    const url = `${environment.BackUrl}${this.priceUrl}/edit/${id}`;
    return this.http.get<Price>(url).pipe(
      tap(_ => this.log(`fetched price id=${id}`)),
      catchError(this.handleError<Price>(`getPrice id=${id}`))
    );
  }

  /* GET prices whose name contains search term */
  searchPrices(term: string): Observable<Price[]> {
    if (!term.trim()) {
      // if not search term, return full price array.
      term = 'all';
    }

    return this.http.get<Price[]>(`${environment.BackUrl}${this.priceUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found prices matching "${term}"`) :
        this.log(`no prices matching "${term}"`)),
      catchError(this.handleError<Price[]>('searchPrices', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new price to the server */
  savePrice(price: Price): Observable<Price> {
    console.log('addPrice works', price);
    return this.http.post<Price>(`${environment.BackUrl}${this.priceUrl}/save`, price, this.httpOptions).pipe(
      tap((newPrice: Price) => this.log(`added price w/ id=${newPrice.price_id}`)),
      catchError(this.handleError<Price>('addPrice')));
  }

  /** DELETE: delete the price from the server */
  deletePrice(price: Price | number): Observable<Price> {
    const id = typeof price === 'number' ? price : price.price_id;
    const url = `${environment.BackUrl}${this.priceUrl}/delete/${id}`;

    return this.http.post<Price>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted price id=${id}`)),
      catchError(this.handleError<Price>('deletePrice'))
    );
  }

  /** PUT: update the price on the server */
  updatePrice(price: Price): Observable<any> {
    return this.http.put(`${environment.BackUrl}${this.priceUrl}/edit`, price, this.httpOptions).pipe(
      tap(_ => this.log(`updated price id=${price.price_id}`)),
      catchError(this.handleError<any>('updatePrice'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PriceService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`PriceService: ${message}`);
  }
}
