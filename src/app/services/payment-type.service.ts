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
  private paymentTypeUrl = 'http://localhost:8080/paymenttype';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

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

  /** POST: add a new paymentType to the server */
  savePaymentType(paymentType: PaymentType): Observable<PaymentType> {
    console.log('savePaymentType works', paymentType);
    return this.http.post<PaymentType>(`${this.paymentTypeUrl}/save`, paymentType, this.httpOptions).pipe(
      tap((newPaymentType: PaymentType) => this.log(`added paymentType w/ id=${newPaymentType.payment_type_id}`)),
      catchError(this.handleError<PaymentType>('savePaymentType')));
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
