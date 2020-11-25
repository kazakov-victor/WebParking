import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Contract} from '../shared/contract';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contractUrl = 'http://localhost:8080/contract';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      charset: 'UTF-8' })
  };

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  /** GET contracts from the server */
  getContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(`${this.contractUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched contracts')),
        catchError(this.handleError<Contract[]>('getContracts', []))
      );
  }

  /** GET contract by id. Return `undefined` when id not found */
  getContractNo404<Data>(id: number): Observable<Contract> {
    const url = `${this.contractUrl}/?id=${id}`;
    return this.http.get<Contract[]>(url)
      .pipe(
        map(contracts => contracts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} contract id=${id}`);
        }),
        catchError(this.handleError<Contract>(`getContract id=${id}`))
      );
  }

  /** GET contract by id. Will 404 if id not found */
  getContract(id: number): Observable<Contract> {
    const url = `${this.contractUrl}/edit/${id}`;
    return this.http.get<Contract>(url).pipe(
      tap(_ => this.log(`fetched contract id=${id}`)),
      catchError(this.handleError<Contract>(`getContract id=${id}`))
    );
  }

  /* GET contracts whose name contains search term */
  searchContracts(term: string): Observable<Contract[]> {
    if (!term.trim()) {
      // if not search term, return full contract array.
      term = 'all';
    }

    return this.http.get<Contract[]>(`${this.contractUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found contracts matching "${term}"`) :
        this.log(`no contracts matching "${term}"`)),
      catchError(this.handleError<Contract[]>('searchContracts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new contract to the server */
  addContract(contract: Contract): Observable<Contract> {
    console.log('addContract works', contract);
    return this.http.post<Contract>(`${this.contractUrl}/save`, contract, this.httpOptions).pipe(
      tap((newContract: Contract) => this.log(`added contract w/ id=${newContract.contract_id}`)),
      catchError(this.handleError<Contract>('addContract')));
  }

  /** DELETE: delete the contract from the server */
  deleteContract(contract: Contract | number): Observable<Contract> {
    const id = typeof contract === 'number' ? contract : contract.contract_id;
    const url = `${this.contractUrl}/delete/${id}`;

    return this.http.post<Contract>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted contract id=${id}`)),
      catchError(this.handleError<Contract>('deleteContract'))
    );
  }

  /** PUT: update the contract on the server */
  updateContract(contract: Contract): Observable<any> {
    return this.http.put(`${this.contractUrl}/edit`, contract, this.httpOptions).pipe(
      tap(_ => this.log(`updated contract id=${contract.contract_id}`)),
      catchError(this.handleError<any>('updateContract'))
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

  /** Log a ContractService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`ContractService: ${message}`);
  }
}
