import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Charge} from '../shared/charge';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private chargeUrl = 'http://localhost:8080/charge';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET charges from the server */
  getCharges(): Observable<Charge[]> {
    return this.http.get<Charge[]>(`${this.chargeUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched charges')),
        catchError(this.handleError<Charge[]>('getCharges', []))
      );
  }

  /** GET charge by id. Return `undefined` when id not found */
  getChargeNo404<Data>(id: number): Observable<Charge> {
    const url = `${this.chargeUrl}/?id=${id}`;
    return this.http.get<Charge[]>(url)
      .pipe(
        map(charges => charges[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} charge id=${id}`);
        }),
        catchError(this.handleError<Charge>(`getCharge id=${id}`))
      );
  }

  /** GET charge by id. Will 404 if id not found */
  getCharge(id: number): Observable<Charge> {
    const url = `${this.chargeUrl}/edit/${id}`;
    return this.http.get<Charge>(url).pipe(
      tap(_ => this.log(`fetched charge id=${id}`)),
      catchError(this.handleError<Charge>(`getCharge id=${id}`))
    );
  }

  /* GET charges whose name contains search term */
  searchCharges(term: string): Observable<Charge[]> {
    if (!term.trim()) {
      // if not search term, return full charge array.
      term = 'all';
    }

    return this.http.get<Charge[]>(`${this.chargeUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found charges matching "${term}"`) :
        this.log(`no charges matching "${term}"`)),
      catchError(this.handleError<Charge[]>('searchCharges', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new charge to the server */
  countCharge(date: string): Observable<string> {
    console.log('countCharge works. Send - ', date);
    return this.http.post<string>(`${this.chargeUrl}/count`, date, this.httpOptions).pipe(
      catchError(this.handleError<Charge>('saveCharge')));
  }

  /** DELETE: delete the charge from the server */
  deleteCharge(charge: Charge | number): Observable<Charge> {
    const id = typeof charge === 'number' ? charge : charge.charge_id;
    const url = `${this.chargeUrl}/delete/${id}`;

    return this.http.post<Charge>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted charge id=${id}`)),
      catchError(this.handleError<Charge>('deleteCharge'))
    );
  }

  /** PUT: update the charge on the server */
  updateCharge(charge: Charge): Observable<any> {
    return this.http.put(`${this.chargeUrl}/edit`, charge, this.httpOptions).pipe(
      tap(_ => this.log(`updated charge id=${charge.charge_id}`)),
      catchError(this.handleError<any>('updateCharge'))
    );
  }

  toggleCloseCharge(id: number): Observable<Charge> {
    const url = `${this.chargeUrl}/toggle/${id}`;
    return this.http.get<Charge>(url).pipe(
      tap(_ => this.log(`toggled charge id=${id}`)),
      catchError(this.handleError<Charge>(`getCharge id=${id}`))
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

  /** Log a ChargeService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`ChargeService: ${message}`);
  }
}
