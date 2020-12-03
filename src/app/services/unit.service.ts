import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Unit} from '../shared/unit';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {
  private unitUrl = 'http://localhost:8080/unit';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(`${this.unitUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched units')),
        catchError(this.handleError<Unit[]>('getUnits', []))
      );
  }

  /** Return `undefined` when id not found */
  getUnitNo404<Data>(id: number): Observable<Unit> {
    const url = `${this.unitUrl}/?id=${id}`;
    return this.http.get<Unit[]>(url)
      .pipe(
        map(units => units[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} unit id=${id}`);
        }),
        catchError(this.handleError<Unit>(`getUnit id=${id}`))
      );
  }

  /** Will 404 if id not found */
  getUnit(id: number): Observable<Unit> {
    const url = `${this.unitUrl}/edit/${id}`;
    return this.http.get<Unit>(url).pipe(
      tap(_ => this.log(`fetched unit id=${id}`)),
      catchError(this.handleError<Unit>(`getUnit id=${id}`))
    );
  }

  searchUnits(term: string): Observable<Unit[]> {
    if (!term.trim()) {
      // if not search term, return full unit array.
      term = 'all';
    }

    return this.http.get<Unit[]>(`${this.unitUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found units matching "${term}"`) :
        this.log(`no units matching "${term}"`)),
      catchError(this.handleError<Unit[]>('searchUnits', []))
    );
  }

  saveUnit(unit: Unit): Observable<Unit> {
    return this.http.post<Unit>(`${this.unitUrl}/save`, unit, this.httpOptions).pipe(
      tap((newUnit: Unit) => this.log(`added unit w/ id=${newUnit.unit_id}`)),
      catchError(this.handleError<Unit>('addUnit')));
  }

  deleteUnit(unit: Unit | number): Observable<Unit> {
    const id = typeof unit === 'number' ? unit : unit.unit_id;
    const url = `${this.unitUrl}/delete/${id}`;

    return this.http.post<Unit>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted unit id=${id}`)),
      catchError(this.handleError<Unit>('deleteUnit'))
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

  /** Log a UnitService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`UnitService: ${message}`);
  }
}
