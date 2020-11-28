import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {PaymentType} from '../shared/payment-type';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  private paymentTypeUrl = 'http://localhost:8080/paymenttype';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET paymentTypes from the server */
  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>(`${this.paymentTypeUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched paymentTypes')),
        catchError(this.handleError<PaymentType[]>('getPaymentTypes', []))
      );
  }

  /** GET paymentType by id. Return `undefined` when id not found */
  getPaymentTypeNo404<Data>(id: number): Observable<PaymentType> {
    const url = `${this.paymentTypeUrl}/?id=${id}`;
    return this.http.get<PaymentType[]>(url)
      .pipe(
        map(paymentTypes => paymentTypes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} paymentType id=${id}`);
        }),
        catchError(this.handleError<PaymentType>(`getPaymentType id=${id}`))
      );
  }

  /** GET paymentType by id. Will 404 if id not found */
  getPaymentType(id: number): Observable<PaymentType> {
    const url = `${this.paymentTypeUrl}/edit/${id}`;
    return this.http.get<PaymentType>(url).pipe(
      tap(_ => this.log(`fetched paymentType id=${id}`)),
      catchError(this.handleError<PaymentType>(`getPaymentType id=${id}`))
    );
  }

  /* GET paymentTypes whose name contains search term */
  searchPaymentTypes(term: string): Observable<PaymentType[]> {
    if (!term.trim()) {
      // if not search term, return full paymentType array.
      term = 'all';
    }

    return this.http.get<PaymentType[]>(`${this.paymentTypeUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found paymentTypes matching "${term}"`) :
        this.log(`no paymentTypes matching "${term}"`)),
      catchError(this.handleError<PaymentType[]>('searchPaymentTypes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new paymentType to the server */
  addPaymentType(paymentType: PaymentType): Observable<PaymentType> {
    console.log('addPaymentType works', paymentType);
    return this.http.post<PaymentType>(`${this.paymentTypeUrl}/save`, paymentType, this.httpOptions).pipe(
      tap((newPaymentType: PaymentType) => this.log(`added paymentType w/ id=${newPaymentType.payment_type_id}`)),
      catchError(this.handleError<PaymentType>('addPaymentType')));
  }

  /** DELETE: delete the paymentType from the server */
  deletePaymentType(paymentType: PaymentType | number): Observable<PaymentType> {
    const id = typeof paymentType === 'number' ? paymentType : paymentType.payment_type_id;
    const url = `${this.paymentTypeUrl}/delete/${id}`;

    return this.http.post<PaymentType>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted paymentType id=${id}`)),
      catchError(this.handleError<PaymentType>('deletePaymentType'))
    );
  }

  /** PUT: update the paymentType on the server */
  updatePaymentType(paymentType: PaymentType): Observable<any> {
    return this.http.put(`${this.paymentTypeUrl}/edit`, paymentType, this.httpOptions).pipe(
      tap(_ => this.log(`updated paymentType id=${paymentType.payment_type_id}`)),
      catchError(this.handleError<any>('updatePaymentType'))
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

  /** Log a PaymentTypeService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`PaymentTypeService: ${message}`);
  }
}
