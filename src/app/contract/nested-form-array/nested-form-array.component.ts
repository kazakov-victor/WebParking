import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-nested-form-array',
  templateUrl: './nested-form-array.component.html',
  styleUrls: ['./nested-form-array.component.scss']
})
export class NestedFormArrayComponent implements OnInit {

  title = 'Nested FormArray Example Add Form Fields Dynamically';
  empForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.empForm = this.fb.group({
      employees: this.fb.array([]) ,
    });
  }

  employees(): FormArray {
    return this.empForm.get('employees') as FormArray;
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills: this.fb.array([])
    });
  }

  addEmployee(): any {
    console.log('Adding a employee');
    this.employees().push(this.newEmployee());
  }

  removeEmployee(empIndex: number): any {
    this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex: number): FormArray {
    return this.employees().at(empIndex).get('skills') as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skill: '',
      exp: '',
    });
  }

  addEmployeeSkill(empIndex: number): any {
    this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex: number, skillIndex: number): any {
    this.employeeSkills(empIndex).removeAt(skillIndex);
  }

  onSubmit(): any {
    console.log(this.empForm.value);
  }

  ngOnInit(): void {
  }
}
