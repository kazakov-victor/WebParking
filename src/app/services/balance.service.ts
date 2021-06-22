import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Balance} from '../shared/balance';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balanceUrl = '/balance';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET balances from the server */
  getBalances(): Observable<Balance[]> {
    return this.http.get<Balance[]>(`${environment.BackUrl}${this.balanceUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched balances')),
        catchError(this.handleError<Balance[]>('getBalances', []))
      );
  }

  /** GET balance by id. Return `undefined` when id not found */
  getBalanceNo404<Data>(id: number): Observable<Balance> {
    const url = `${environment.BackUrl}${this.balanceUrl}/?id=${id}`;
    return this.http.get<Balance[]>(url)
      .pipe(
        map(balances => balances[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} balance id=${id}`);
        }),
        catchError(this.handleError<Balance>(`getBalance id=${id}`))
      );
  }

  /** GET balance by id. Will 404 if id not found */
  getBalance(id: number): Observable<Balance> {
    const url = `${environment.BackUrl}${this.balanceUrl}/edit/${id}`;
    return this.http.get<Balance>(url).pipe(
      tap(_ => this.log(`fetched balance id=${id}`)),
      catchError(this.handleError<Balance>(`getBalance id=${id}`))
    );
  }

  /* GET balances whose name contains search term */
  searchBalances(term: string): Observable<Balance[]> {
    if (!term.trim()) {
      // if not search term, return full balance array.
      term = 'all';
    }

    return this.http.get<Balance[]>(`${environment.BackUrl}${this.balanceUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found balances matching "${term}"`) :
        this.log(`no balances matching "${term}"`)),
      catchError(this.handleError<Balance[]>('searchBalances', []))
    );
  }

  //////// Save methods //////////

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

  /** Log a BalanceService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`BalanceService: ${message}`);
  }
}
