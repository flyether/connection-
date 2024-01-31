import { Component, Input, OnInit } from '@angular/core';
import { RegData } from './models/login.model';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ButtonStandardComponent } from '../button-standard/button-standart.component';
import { UserActions } from 'src/app/Store/user/user.action';
import { validatePassword } from './password-validator';

@Component({
  selector: 'app-form-auth',
  templateUrl: './form-auth.component.html',
  styleUrls: ['./form-auth.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonStandardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class FormAuthComponent implements OnInit {
  @Input() title: string;
  textInButton = 'Login';
  isDisabled: boolean = false;
  myReactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s]*$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, validatePassword]),
  });
  constructor(private store$: Store) {}
  ngOnInit(): void {
    if (this.title === 'SingUp') this.textInButton = 'SingUp';
  }

  submitForm() {
    this.myReactForm.markAllAsTouched();

    const loginData: RegData = {
      email: this.myReactForm.value.email,
      password: this.myReactForm.value.password,
      name: this.myReactForm.value.name || undefined,
    };
    if (this.title === 'SingUp') {
      if (this.myReactForm.invalid) {
        return;
      }
      this.store$.dispatch(UserActions.singUpUserStart({ data: loginData }));
      this.isDisabled = true;
    }

    if (this.title === 'Login') {
      if (
        this.myReactForm.controls.email.invalid ||
        this.myReactForm.controls.password.invalid
      ) {
        console.log(this.myReactForm.value, '33333');
        return;
      }
      this.store$.dispatch(UserActions.loginUserStart({ data: loginData }));
      this.isDisabled = true;
    }
  }

  onDataChange() {
    this.isDisabled = false;
  }
}
