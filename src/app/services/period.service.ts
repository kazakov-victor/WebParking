import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Period} from '../shared/period';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {
  private periodUrl = 'http://localhost:8080/period';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET periods from the server */
  getPeriods(): Observable<Period[]> {
    return this.http.get<Period[]>(`${this.periodUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched periods')),
        catchError(this.handleError<Period[]>('getPeriods', []))
      );
  }

  /** GET period by id. Return `undefined` when id not found */
  getPeriodNo404<Data>(id: number): Observable<Period> {
    const url = `${this.periodUrl}/?id=${id}`;
    return this.http.get<Period[]>(url)
      .pipe(
        map(periods => periods[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} period id=${id}`);
        }),
        catchError(this.handleError<Period>(`getPeriod id=${id}`))
      );
  }

  /** GET period by id. Will 404 if id not found */
  getPeriod(id: number): Observable<Period> {
    const url = `${this.periodUrl}/edit/${id}`;
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

    return this.http.get<Period[]>(`${this.periodUrl}/search?keyword=${term}`).pipe(
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
    return this.http.post<Period>(`${this.periodUrl}/save`, period, this.httpOptions).pipe(
      tap((newPeriod: Period) => this.log(`added period w/ id=${newPeriod.period_id}`)),
      catchError(this.handleError<Period>('savePeriod')));
  }

  /** DELETE: delete the period from the server */
  deletePeriod(period: Period | number): Observable<Period> {
    const id = typeof period === 'number' ? period : period.period_id;
    const url = `${this.periodUrl}/delete/${id}`;

    return this.http.post<Period>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted period id=${id}`)),
      catchError(this.handleError<Period>('deletePeriod'))
    );
  }

  /** PUT: update the period on the server */
  updatePeriod(period: Period): Observable<any> {
    return this.http.put(`${this.periodUrl}/edit`, period, this.httpOptions).pipe(
      tap(_ => this.log(`updated period id=${period.period_id}`)),
      catchError(this.handleError<any>('updatePeriod'))
    );
  }

  toggleClosePeriod(id: number): Observable<Period> {
    const url = `${this.periodUrl}/toggle/${id}`;
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
