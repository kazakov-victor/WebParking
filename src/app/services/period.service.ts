import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Period} from '../shared/period';
import {MessageService} from './message.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private periodUrl = '/period';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET periods from the server */
  getPeriods(): Observable<Period[]> {
    return this.http.get<Period[]>(`${environment.BackUrl}${this.periodUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched periods')),
        catchError(this.handleError<Period[]>('getPeriods', []))
      );
  }

  /** Create periods for given year . Return `undefined` when id not found */
  createPeriod<Data>(year: number): Observable<Period> {
    const url = `${environment.BackUrl}${this.periodUrl}/create/${year}`;
    return this.http.get<string>(url)
      .pipe(
        tap(h => {
          this.log(`periods are created`);
        }),
        catchError(this.handleError<string>(`Periods crashed`))
      );
  }

  /** GET period by id. Will 404 if id not found */
  getPeriod(id: number): Observable<Period> {
    const url = `${environment.BackUrl}${this.periodUrl}/edit/${id}`;
    return this.http.get<Period>(url).pipe(
      tap(_ => this.log(`fetched period id=${id}`)),
      catchError(this.handleError<Period>(`getPeriod id=${id}`))
    );
  }

  /* GET periods whose name contains search term */
  searchPeriods(term: string): Observable<Period[]> {
    if (!term.trim()) {
      // if not search term, return full period array.
      term = 'all';
    }

    return this.http.get<Period[]>(`${environment.BackUrl}${this.periodUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found periods matching "${term}"`) :
        this.log(`no periods matching "${term}"`)),
      catchError(this.handleError<Period[]>('searchPeriods', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new period to the server */
  savePeriod(period: Period): Observable<Period> {
    console.log('savePeriod works', period);
    return this.http.post<Period>(`${environment.BackUrl}${this.periodUrl}/save`, period, this.httpOptions).pipe(
      tap((newPeriod: Period) => this.log(`added period w/ id=${newPeriod.period_id}`)),
      catchError(this.handleError<Period>('savePeriod')));
  }

  toggleClosePeriod(id: number): Observable<Period> {
    const url = `${environment.BackUrl}${this.periodUrl}/toggle/${id}`;
    return this.http.get<Period>(url).pipe(
      tap(_ => this.log(`toggled period id=${id}`)),
      catchError(this.handleError<Period>(`getPeriod id=${id}`))
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

  /** Log a PeriodService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`PeriodService: ${message}`);
  }
}
