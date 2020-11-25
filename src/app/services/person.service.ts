import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Person} from '../shared/person';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personUrl = 'http://localhost:8080/person';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                            charset: 'UTF-8' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET persons from the server */
  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.personUrl}/list`)
      .pipe(
        tap(_ => this.log('fetched persons')),
        catchError(this.handleError<Person[]>('getPersons', []))
      );
  }

  /** GET person by id. Return `undefined` when id not found */
  getPersonNo404<Data>(id: number): Observable<Person> {
    const url = `${this.personUrl}/?id=${id}`;
    return this.http.get<Person[]>(url)
      .pipe(
        map(persons => persons[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} person id=${id}`);
        }),
        catchError(this.handleError<Person>(`getPerson id=${id}`))
      );
  }

  /** GET person by id. Will 404 if id not found */
  getPerson(id: number): Observable<Person> {
    const url = `${this.personUrl}/edit/${id}`;
    return this.http.get<Person>(url).pipe(
      tap(_ => this.log(`fetched person id=${id}`)),
      catchError(this.handleError<Person>(`getPerson id=${id}`))
    );
  }

  /* GET persons whose name contains search term */
  searchPersons(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return full person array.
      term = 'all';
    }

    return this.http.get<Person[]>(`${this.personUrl}/search?keyword=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found persons matching "${term}"`) :
        this.log(`no persons matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPersons', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new person to the server */
  addPerson(person: Person): Observable<Person> {
    console.log('addPerson works', person);
    return this.http.post<Person>(`${this.personUrl}/save`, person, this.httpOptions).pipe(
      tap((newPerson: Person) => this.log(`added person w/ id=${newPerson.person_id}`)),
      catchError(this.handleError<Person>('addPerson')));
  }

  /** DELETE: delete the person from the server */
  deletePerson(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.person_id;
    const url = `${this.personUrl}/delete/${id}`;

    return this.http.post<Person>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /** PUT: update the person on the server */
  updatePerson(person: Person): Observable<any> {
    return this.http.put(`${this.personUrl}/edit`, person, this.httpOptions).pipe(
      tap(_ => this.log(`updated person id=${person.person_id}`)),
      catchError(this.handleError<any>('updatePerson'))
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

  /** Log a PersonService message with the MessageService */
  private log(message: string): void {
    this.messageService.add(`PersonService: ${message}`);
  }
}
