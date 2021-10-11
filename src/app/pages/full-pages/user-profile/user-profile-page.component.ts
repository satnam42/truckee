import { Component, ViewChild, OnInit, OnDestroy, Inject, Renderer2, ChangeDetectorRef,ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

export class User {
  public dname: string;
  public lcls: string;
  public lnum: string;
  public country: string;
  public state: string;
}

@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit {
 @ViewChild('vform') validationForm: FormGroup;
  user: User;
  model = new User();
  submitted = false;
  licenceClassList: any=[{name:'A'}, {name:'B'},{name:'C'}];
  stateList: any;
  /*countryList: any = [{id:1, value:'United States'}];*/
  employeeForm = new FormGroup({
    dname: new FormControl('', [Validators.required]),
    lcls: new FormControl('', [Validators.required]),
    lnum: new FormControl('', [Validators.required]),
	country: new FormControl('United States', [Validators.required]),
	state: new FormControl('', [Validators.required])
  });

  constructor() {
    this.model = {
      dname: '',
      lcls: '',
      lnum: '',
	  country: 'United States',
	  state: '',
    }
  }

ngOnInit() {}

onSubmit(form) {
    console.log(form.value)
  }

  get f() {
    return this.employeeForm.controls;
  }

  onReactiveFormSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    console.log(this.employeeForm.value);
  }

  onCustomFormSubmit() {
    this.validationForm.reset();
  }
}
