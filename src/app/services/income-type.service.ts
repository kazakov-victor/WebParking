import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {IncomeTypeDTO} from '../shared/income-type';
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
  getIncomeTypes(): Observable<IncomeTypeDTO[]> {
    return this.http.get<IncomeTypeDTO[]>(`${this.incomeTypeUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched incomeTypes')),
        catchError(this.handleError<IncomeTypeDTO[]>('getIncomeTypes', []))
      );
  }

  /** GET incomeType by id. Return `undefined` when id not found */
  getIncomeTypeNo404<Data>(id: number): Observable<IncomeTypeDTO> {
    const url = `${this.incomeTypeUrl}/?id=${id}`;
    return this.http.get<IncomeTypeDTO[]>(url)
      .pipe(
        map(incomeTypes => incomeTypes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} incomeType id=${id}`);
        }),
        catchError(this.handleError<IncomeTypeDTO>(`getIncomeType id=${id}`))
      );
  }

  /** GET incomeType by id. Will 404 if id not found */
  getIncomeType(id: number): Observable<IncomeTypeDTO> {
    const url = `${this.incomeTypeUrl}/edit/${id}`;
    return this.http.get<IncomeTypeDTO>(url).pipe(
      tap(_ => this.log(`fetched incomeType id=${id}`)),
      catchError(this.handleError<IncomeTypeDTO>(`getIncomeType id=${id}`))
    );
  }

  /* GET incomeTypes whose name contains search term */
  searchIncomeTypes(term: string): Observable<IncomeTypeDTO[]> {
    if (!term.trim()) {
      // if not search term, return full incomeType array.
      term = 'all';
    }

    return this.http.get<IncomeTypeDTO[]>(`${this.incomeTypeUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found incomeTypes matching "${term}"`) :
        this.log(`no incomeTypes matching "${term}"`)),
      catchError(this.handleError<IncomeTypeDTO[]>('searchIncomeTypes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new incomeType to the server */
  addIncomeType(incomeTypeDTO: IncomeTypeDTO): Observable<IncomeTypeDTO> {
    console.log('addIncomeType works', incomeTypeDTO);
    return this.http.post<IncomeTypeDTO>(`${this.incomeTypeUrl}/save`, incomeTypeDTO, this.httpOptions).pipe(
      tap((newIncomeType: IncomeTypeDTO) => this.log(`added incomeType w/ id=${newIncomeType.income_type_id}`)),
      catchError(this.handleError<IncomeTypeDTO>('addIncomeType')));
  }

  /** DELETE: delete the incomeType from the server */
  deleteIncomeType(incomeTypeDTO
                     : IncomeTypeDTO | number): Observable<IncomeTypeDTO> {
    const id = typeof incomeTypeDTO === 'number' ? incomeTypeDTO : incomeTypeDTO.income_type_id;
    const url = `${this.incomeTypeUrl}/delete/${id}`;

    return this.http.post<IncomeTypeDTO>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted incomeType id=${id}`)),
      catchError(this.handleError<IncomeTypeDTO>('deleteIncomeType'))
    );
  }

  /** PUT: update the incomeType on the server */
  updateIncomeType(incomeType: IncomeTypeDTO): Observable<any> {
    return this.http.put(`${this.incomeTypeUrl}/edit`, incomeType, this.httpOptions).pipe(
      tap(_ => this.log(`updated incomeType id=${incomeType.income_type_id}`)),
      catchError(this.handleError<any>('updateIncomeType'))
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
