import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

interface Contact {
  name: string;
  age: number;
}

@Component({
  selector: 'app-example',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class ExampleComponent {

  contacts: Contact[] = [{ name: 'xyz', age: 30 }, { name: 'abc', age: 25 }];
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.contactForm = this.fb.group({
      contacts: this.fb.array(this.contacts.map(contact => this.createContact(contact)))
    });

    console.log(this.contactForm.value);

  }

  createContact(contact): FormGroup {
    return this.fb.group({
      name: [contact.name],
      age: [contact.age]
    });
  }

}
