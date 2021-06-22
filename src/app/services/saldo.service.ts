import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Saldo} from '../shared/saldo';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaldoService {
  private saldoUrl = '/saldo';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET saldos from the server */
  getSaldos(): Observable<Saldo[]> {
    return this.http.get<Saldo[]>(`${environment.BackUrl}${this.saldoUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched saldos')),
        catchError(this.handleError<Saldo[]>('getSaldos', []))
      );
  }

  /** GET saldo by id. Return `undefined` when id not found */
  getSaldoNo404<Data>(id: number): Observable<Saldo> {
    const url = `${environment.BackUrl}${this.saldoUrl}/?id=${id}`;
    return this.http.get<Saldo[]>(url)
      .pipe(
        map(saldos => saldos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} saldo id=${id}`);
        }),
        catchError(this.handleError<Saldo>(`getSaldo id=${id}`))
      );
  }

  /** GET saldo by id. Will 404 if id not found */
  getSaldo(id: number): Observable<Saldo> {
    const url = `${environment.BackUrl}${this.saldoUrl}/edit/${id}`;
    return this.http.get<Saldo>(url).pipe(
      tap(_ => this.log(`fetched saldo id=${id}`)),
      catchError(this.handleError<Saldo>(`getSaldo id=${id}`))
    );
  }

  /* GET saldos whose name contains search term */
  searchSaldos(term: string): Observable<Saldo[]> {
    if (!term.trim()) {
      // if not search term, return full saldo array.
      term = 'all';
    }

    return this.http.get<Saldo[]>(`${environment.BackUrl}${this.saldoUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found saldos matching "${term}"`) :
        this.log(`no saldos matching "${term}"`)),
      catchError(this.handleError<Saldo[]>('searchSaldos', []))
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

  /** Log a SaldoService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`SaldoService: ${message}`);
  }
}
