import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private billingUrl = '/billing';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }


  /** GET billing by id. Return `undefined` when id not found */
  countBillingPeriodNo404<Data>(id: number): Observable<string> {
    const url = `${environment.BackUrl}${this.billingUrl}/${id}`;
    return this.http.get<string>(url)
      .pipe(
        tap(() => {
          this.log(`Billing period id=${id}`);
        }),
        catchError(this.handleError<string>(`getBilling id=${id}`))
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

  /** Log a BillingService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`BillingService: ${message}`);
  }
}
