import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ButtonStandardComponent } from 'src/app/components/button-standard/button-standart.component';
import { GroupActions } from '../../../Store/group/group.action'
import { newGroupData } from 'src/app/core/models/interface';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonStandardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ModalComponent {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  
  myReactForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Zа-яА-Я0-9\s]*$/),
      Validators.maxLength(30),
    ]),
   
  });

 
  submitForm() {
    this.myReactForm.markAllAsTouched();
    if (this.myReactForm.invalid) {

      return;
    }
 
const newGroupData:newGroupData = {
      name: {
        S: this.myReactForm.controls.name.value
      },
      createdAt: {
        S: new Date().toString()
      },
    }


    this.store$.dispatch(GroupActions.groupCreateStart({ data: { name : this.myReactForm.controls.name.value } }));
    this.store$.dispatch(GroupActions.groupCreateNewToStore({ data: newGroupData }));
    this.closeModal.emit();
}
constructor(private store$: Store) {}
}
