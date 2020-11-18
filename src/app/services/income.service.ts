import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Income} from './income';
import {MessageService} from './message.service';


@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  private incomeUrl = 'http://localhost:8080/income';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET incomes from the server */
  getIncomes(): Observable<Income[]> {
    return this.http.get<Income[]>(`${this.incomeUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched incomes')),
        catchError(this.handleError<Income[]>('getIncomes', []))
      );
  }

  /** GET income by id. Return `undefined` when id not found */
  getIncomeNo404<Data>(id: number): Observable<Income> {
    const url = `${this.incomeUrl}/?id=${id}`;
    return this.http.get<Income[]>(url)
      .pipe(
        map(incomes => incomes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} income id=${id}`);
        }),
        catchError(this.handleError<Income>(`getIncome id=${id}`))
      );
  }

  /** GET income by id. Will 404 if id not found */
  getIncome(id: number): Observable<Income> {
    const url = `${this.incomeUrl}/edit/${id}`;
    return this.http.get<Income>(url).pipe(
      tap(_ => this.log(`fetched income id=${id}`)),
      catchError(this.handleError<Income>(`getIncome id=${id}`))
    );
  }

  /* GET incomes whose name contains search term */
  searchIncomes(term: string): Observable<Income[]> {
    if (!term.trim()) {
      // if not search term, return full income array.
      term = 'all';
    }

    return this.http.get<Income[]>(`${this.incomeUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found incomes matching "${term}"`) :
        this.log(`no incomes matching "${term}"`)),
      catchError(this.handleError<Income[]>('searchIncomes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new income to the server */
  addIncome(income: Income): Observable<Income> {
    console.log('addIncome works', income);
    return this.http.post<Income>(`${this.incomeUrl}/save`, income, this.httpOptions).pipe(
      tap((newIncome: Income) => this.log(`added income w/ id=${newIncome.income_id}`)),
      catchError(this.handleError<Income>('addIncome')));
  }

  /** DELETE: delete the income from the server */
  deleteIncome(income: Income | number): Observable<Income> {
    const id = typeof income === 'number' ? income : income.income_id;
    const url = `${this.incomeUrl}/delete/${id}`;

    return this.http.post<Income>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted income id=${id}`)),
      catchError(this.handleError<Income>('deleteIncome'))
    );
  }

  /** PUT: update the income on the server */
  updateIncome(income: Income): Observable<any> {
    return this.http.put(`${this.incomeUrl}/edit`, income, this.httpOptions).pipe(
      tap(_ => this.log(`updated income id=${income.income_id}`)),
      catchError(this.handleError<any>('updateIncome'))
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

  /** Log a IncomeService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`IncomeService: ${message}`);
  }
}
