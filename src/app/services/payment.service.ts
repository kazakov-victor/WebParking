import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Payment} from '../shared/payment';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentUrl = '/payment';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET payments from the server */
  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.BackUrl}${this.paymentUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched payments')),
        catchError(this.handleError<Payment[]>('getPayments', []))
      );
  }

  /** GET payment by id. Return `undefined` when id not found */
  getPaymentNo404<Data>(id: number): Observable<Payment> {
    const url = `${environment.BackUrl}${this.paymentUrl}/?id=${id}`;
    return this.http.get<Payment[]>(url)
      .pipe(
        map(payments => payments[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} payment id=${id}`);
        }),
        catchError(this.handleError<Payment>(`getPayment id=${id}`))
      );
  }

  /** GET payment by id. Will 404 if id not found */
  getPayment(id: number): Observable<Payment> {
    const url = `${environment.BackUrl}${this.paymentUrl}/edit/${id}`;
    return this.http.get<Payment>(url).pipe(
      tap(_ => this.log(`fetched payment id=${id}`)),
      catchError(this.handleError<Payment>(`getPayment id=${id}`))
    );
  }

  /* GET payments whose name contains search term */
  searchPayments(term: string): Observable<Payment[]> {
    if (!term.trim()) {
      // if not search term, return full payment array.
      term = 'all';
    }

    return this.http.get<Payment[]>(`${environment.BackUrl}${this.paymentUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found payments matching "${term}"`) :
        this.log(`no payments matching "${term}"`)),
      catchError(this.handleError<Payment[]>('searchPayments', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new payment to the server */
  savePayment(payment: Payment): Observable<Payment> {
    console.log('savePayment works', payment);
    return this.http.post<Payment>(`${environment.BackUrl}${this.paymentUrl}/save`, payment, this.httpOptions).pipe(
      tap((newPayment: Payment) => this.log(`added payment w/ id=${newPayment.payment_id}`)),
      catchError(this.handleError<Payment>('savePayment')));
  }

  /** DELETE: delete the payment from the server */
  deletePayment(payment: Payment | number): Observable<Payment> {
    const id = typeof payment === 'number' ? payment : payment.payment_id;
    const url = `${environment.BackUrl}${this.paymentUrl}/delete/${id}`;

    return this.http.post<Payment>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted payment id=${id}`)),
      catchError(this.handleError<Payment>('deletePayment'))
    );
  }

  /** PUT: update the payment on the server */
  updatePayment(payment: Payment): Observable<any> {
    return this.http.put(`${environment.BackUrl}${this.paymentUrl}/edit`, payment, this.httpOptions).pipe(
      tap(_ => this.log(`updated payment id=${payment.payment_id}`)),
      catchError(this.handleError<any>('updatePayment'))
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

  /** Log a PaymentService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`PaymentService: ${message}`);
  }
}
