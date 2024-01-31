import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserActions } from '../Store/user/user.action';
import { GivMeProfile } from '../Store/user/user.selectors';
import { CommonModule } from '@angular/common';
import { ButtonStandardComponent } from '../components/button-standard/button-standart.component';
import { Observable } from 'rxjs';
import { Profile } from '../core/models/interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  standalone: true,
  imports: [
    ButtonStandardComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfilePageComponent implements OnInit {
  profile$: Observable<Profile | undefined> = this.store$.select(GivMeProfile);
  isEdit: boolean = false;
  isDisabledExit: boolean = false;
  myReactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(40),
      Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s]*$/),
    ]),
  });

  constructor(private store$: Store, private router: Router) {}

  submitForm() {
    this.myReactForm.markAllAsTouched();
    if (this.myReactForm.invalid) {
      return;
    }

    this.store$.dispatch(UserActions.namePut({ data: this.myReactForm.value }));
    this.isEdit = false;
  }

  exit() {
    this.isDisabledExit = true;

    this.store$.dispatch(UserActions.userDelete());

    // this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.store$.dispatch(UserActions.profileStart());
  }
}
