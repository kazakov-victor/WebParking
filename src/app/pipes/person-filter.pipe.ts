import { Pipe, PipeTransform } from '@angular/core';
import {Person} from '../shared/person';

@Pipe({
  name: 'personFilter',
  pure: false
})
export class PersonFilterPipe implements PipeTransform {

  transform(persons: Person [], search: string = ''): Person [] {
    if (!search.trim()) {
      return persons;
    }
    return persons.filter(person => {
      return person.surname.toLowerCase().includes(search);
    });
  }

}
