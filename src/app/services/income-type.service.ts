import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {IncomeType} from '../shared/income-type';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class IncomeTypeService {
  private incomeTypeUrl = 'http://localhost:8080/incometype';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET incomeTypes from the server */
  getIncomeTypes(): Observable<IncomeType[]> {
    return this.http.get<IncomeType[]>(`${this.incomeTypeUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched incomeTypes')),
        catchError(this.handleError<IncomeType[]>('getIncomeTypes', []))
      );
  }

  /** GET incomeType by id. Return `undefined` when id not found */
  getIncomeTypeNo404<Data>(id: number): Observable<IncomeType> {
    const url = `${this.incomeTypeUrl}/?id=${id}`;
    return this.http.get<IncomeType[]>(url)
      .pipe(
        map(incomeTypes => incomeTypes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} incomeType id=${id}`);
        }),
        catchError(this.handleError<IncomeType>(`getIncomeType id=${id}`))
      );
  }

  /** GET incomeType by id. Will 404 if id not found */
  getIncomeType(id: number): Observable<IncomeType> {
    const url = `${this.incomeTypeUrl}/edit/${id}`;
    return this.http.get<IncomeType>(url).pipe(
      tap(_ => this.log(`fetched incomeType id=${id}`)),
      catchError(this.handleError<IncomeType>(`getIncomeType id=${id}`))
    );
  }

  /* GET incomeTypes whose name contains search term */
  searchIncomeTypes(term: string): Observable<IncomeType[]> {
    if (!term.trim()) {
      // if not search term, return full incomeType array.
      term = 'all';
    }

    return this.http.get<IncomeType[]>(`${this.incomeTypeUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found incomeTypes matching "${term}"`) :
        this.log(`no incomeTypes matching "${term}"`)),
      catchError(this.handleError<IncomeType[]>('searchIncomeTypes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new incomeType to the server */
  saveIncomeType(incomeType: IncomeType): Observable<IncomeType> {
    console.log('addIncomeType works', incomeType);
    return this.http.post<IncomeType>(`${this.incomeTypeUrl}/save`, incomeType, this.httpOptions).pipe(
      tap((newIncomeType: IncomeType) => this.log(`added incomeType w/ id=${newIncomeType.incometype_id}`)),
      catchError(this.handleError<IncomeType>('addIncomeType')));
  }

  /** DELETE: delete the incomeType from the server */
  deleteIncomeType(incomeType
                     : IncomeType | number): Observable<IncomeType> {
    const id = typeof incomeType === 'number' ? incomeType : incomeType.incometype_id;
    const url = `${this.incomeTypeUrl}/delete/${id}`;

    return this.http.post<IncomeType>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted incomeType id=${id}`)),
      catchError(this.handleError<IncomeType>('deleteIncomeType'))
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

  /** Log a IncomeTypeService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`IncomeTypeService: ${message}`);
  }
}
