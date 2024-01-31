import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { GroupActions } from 'src/app/Store/group/group.action';
import { ConversationsActions } from 'src/app/Store/people/conversations.action';
import { ButtonStandardComponent } from 'src/app/components/button-standard/button-standart.component';

@Component({
  selector: 'app-massage-form',
  templateUrl: './massage-form.component.html',
  styleUrls: ['./massage-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonStandardComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MassageFormComponent {
  @Input() gropeId: string;
  @Input() typeInput: string
  myReactForm: FormGroup = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  submitForm() {
    this.myReactForm.markAllAsTouched();
    if (this.myReactForm.invalid) {
      return;
    }
    if(this.typeInput==='group') {
    this.store$.dispatch(
      GroupActions.groupCreateMessage( {data: {message: this.myReactForm.value.message,  groupID: this.gropeId  }} )
    );}
    if(this.typeInput==='people') {
      this.store$.dispatch(
        ConversationsActions.conversationCreateMessage( {data: {message: this.myReactForm.value.message,  conversationID: this.gropeId  }} )
      );}

    this.myReactForm.reset();
  }
  constructor(private store$: Store) {}
}
